import { useEffect, useState } from 'react';
import { useAuth } from '../context/authcontext';
import PlayerCard from '../components/playercard'; 
import { useNavigate } from 'react-router-dom';

function MisJugadores() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchPlayers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/historicplayers/misjugadores`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Error al cargar jugadores');
        const data = await res.json();
        setPlayers(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [user, navigate]);

  if (loading) return <p>Cargando jugadores...</p>;

  if (players.length === 0) return <p>No tenés jugadores creados.</p>;

  return (
    <div className="players-list">
      <h2>Mis jugadores</h2>
      {players.map((player) => (
        <PlayerCard key={player._id} player={player} />
      ))}
    </div>
  );
}

export default MisJugadores;
