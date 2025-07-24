import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlayerCard from '../components/playercard';
import './playerslist.css';

function PlayersList() {
  const { region } = useParams();
  const [allPlayers, setAllPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const playersPerPage = 8;

  useEffect(() => {
    setPage(1);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/historicplayers/region/${region}`)
      .then(res => res.json())
      .then(data => {
        const players = data.data || data;
        setAllPlayers(players);
      });
  }, [region]);

  const totalPages = Math.ceil(allPlayers.length / playersPerPage);
  const startIndex = (page - 1) * playersPerPage;
  const currentPlayers = allPlayers.slice(startIndex, startIndex + playersPerPage);

  if (!region) return <p>Región no definida</p>;

  return (
    <div className="players-section">
      <h2 className="region-title">Jugadores de {region.charAt(0).toUpperCase() + region.slice(1)}</h2>

      <div className="players-grid">
        {currentPlayers.map(player => (
          <PlayerCard key={player._id} player={player} />
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</button>
        <span>{page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Siguiente</button>
      </div>
    </div>
  );
};

export default PlayersList;