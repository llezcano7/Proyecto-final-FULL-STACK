import { FaTrophy, FaFutbol } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { useAuth } from '../context/authcontext';
import { Link } from 'react-router-dom';
import './playercard.css';

const formatPosition = (position) => {
  return position
    ? position.charAt(0).toUpperCase() + position.slice(1)
    : "Posición desconocida";
};

function PlayerCard({ player }) {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!player || !player.name || !player.position || !player.nationality || !player.region || !player.teams || !player.world_cup || !player.data || deleted) {
    return null;
  }

  const { _id, name, position, nationality, region, teams, world_cup, data } = player;

  const handleDelete = async () => {
    const confirmDelete = confirm(`¿Estás seguro de eliminar a ${name}?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/historicplayers/name/${name}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Error al eliminar el jugador');
      alert('Jugador eliminado correctamente');
      setDeleted(true);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="player-container grid grid-cols-3">
      <div className={`player-card ${visible ? 'visible' : ''}`}>
        <h3 className="player-name">{name}</h3>

        <div className="player-row">
          <FaFutbol className="icon" />
          <span className="position-highlight">{formatPosition(position)}</span>
        </div>

        <div className="player-row">
          <FaLocationDot className="icon" />
          <strong>Nacionalidad:</strong> {nationality.charAt(0).toUpperCase() + nationality.slice(1)}
        </div>

        <div className="player-row">
          <strong>Región:</strong> {region.charAt(0).toUpperCase() + region.slice(1)}
        </div>

        <div className="player-row">
          <strong>Equipos:</strong> {Array.isArray(teams) ? teams.join(', ') : teams}
        </div>

        <div className="player-row">
          <FaTrophy className="icon" />
          <strong>Copas del Mundo:</strong>
          <ul className="worldcup-list">
            {Array.isArray(world_cup) && world_cup.length > 0 ? (
              world_cup.map((cup, index) => <li key={index}>{cup}</li>)
            ) : (
              <li>No participó</li>
            )}
          </ul>
        </div>

        <p className="player-data">{data}</p>

        {user && (
          <div className="player-actions">
            <button className="delete-button" onClick={handleDelete}>🗑️ Eliminar</button>
            <Link className="edit-button" to={`/edit/${_id}`}>✏️ Editar</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayerCard;