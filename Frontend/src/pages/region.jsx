import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Region() {
  const { region } = useParams();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      setError(null); 
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/historicplayers/region/${region}`);
        const data = await res.json();


        if (res.ok) {
          setPlayers(data.data || []);
        } else {
          setError(data.message || "Error desconocido");
          setPlayers([]);
        }
      } catch (error) {
        setError(error.message || "Error de red");
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, [region]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!players.length) return <p>No hay jugadores para esta región.</p>;

  return (
    <div>
      <h2>Jugadores de la región {region}</h2>
      <ul>
        {players.map(player => (
          <li key={player._id}>{player.name} - {player.position}</li>
        ))}
      </ul>
    </div>
  );
}

export default Region;

