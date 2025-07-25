import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchBar from '../components/searchbar';
import PlayerCard from '../components/playercard';

function PlayersList() {
  const { region } = useParams();
  const [allPlayers, setAllPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const playersPerPage = 8;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setPage(1);
    if (searchTerm.trim() === "") {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/historicplayers/region/${region}`)
        .then(res => res.json())
        .then(data => {
          console.log("DATA FETCHED:", data);
          const players = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
          setAllPlayers(players);
        })
        .catch(() => setAllPlayers([]));
    } else {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/historicplayers/name/${searchTerm}`)
        .then(res => res.json())
        .then(data => {
          const players = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
          setAllPlayers(players);
        })
        .catch(() => setAllPlayers([]));
    }
  }, [region, searchTerm]);

  const totalPages = Math.ceil(allPlayers.length / playersPerPage);
  const startIndex = (page - 1) * playersPerPage;
  const currentPlayers = Array.isArray(allPlayers)
    ? allPlayers.slice(startIndex, startIndex + playersPerPage)
    : [];

  if (!region) return <p>Región no definida</p>;

  return (
    <div className="players-section display-flex flex-column gap-2 pd-2 align-center">
      <h2 className="region-title">
        {searchTerm.trim() === ""
          ? `Jugadores de ${region.charAt(0).toUpperCase() + region.slice(1)}`
          : `Resultados para "${searchTerm}"`}
      </h2>

      <SearchBar onSearch={term => {
        setSearchTerm(term);
        setPage(1);
      }} />

      {currentPlayers.length === 0 ? (
        <p>No se encontraron jugadores.</p>
      ) : (
        <div className="players-grid grid grid-cols-3 gap-2 width-1 items-center">
          {currentPlayers.map(player => (
            <PlayerCard key={player._id} player={player} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination display-flex align-center gap-1">
          <button className='btn' disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</button>
          <span className='pd-inline-1'>{page} / {totalPages}</span>
          <button className='btn' disabled={page === totalPages} onClick={() => setPage(page + 1)}>Siguiente</button>
        </div>
      )}
    </div>
  );
}

export default PlayersList;