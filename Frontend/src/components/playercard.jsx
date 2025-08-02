import { FaTrophy, FaFutbol } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import './playercard.css';

const formatPosition = (position) => {
  return position ? position.charAt(0).toUpperCase() + position.slice(1) : "Posición desconocida"
}

function PlayerCard({ player }) {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  const handleEdit = (id) => { navigate(`/edit/${id}`); };


  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);
  console.log('PLAYER:', player)

  if (!player || deleted) return null;

  const { _id, name, position, nationality, region, teams, world_cup, data } = player;

  const handleDelete = async () => {
    const confirmDelete = confirm(`¿Estás seguro de eliminar a ${name}?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/historicplayers/${_id}`, {
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
          <FaFutbol className="style-icons" />
          <span className="position">{formatPosition(position)}</span>
        </div>

        <div className="player-row">
          <FaLocationDot className="style-icons" />
          <strong className="row-line">Nacionalidad:</strong> {" "} {nationality ? nationality.charAt(0).toUpperCase() + nationality.slice(1) : "Sin nacionalidad"}
        </div>

        <div className="player-row">
          <strong className="row-line">Región:</strong>{" "}
          {region ? region.charAt(0).toUpperCase() + region.slice(1) : "Sin región"}
        </div>



        <div className="player-row">
          <strong className="row-line">Equipos:</strong> {Array.isArray(teams) ? teams.join(', ') : teams}
        </div>

        <div className="player-row">
          <FaTrophy className="style-icons" />
          <strong>Copas del Mundo:</strong>
          <ul className="worldcup-list">
            {Array.isArray(world_cup) && world_cup.length > 0 ? (
              world_cup.map((cup, index) => <li key={index}>{cup}</li>)
            ) : (
              <li>No participó</li>
            )}
          </ul>
        </div>

        <p className="player-data">
          {data && typeof data === 'object' ? JSON.stringify(data) : data || 'Sin información'}
        </p>


        {user && (
          <div className="player-actions">
            <button className="edit-button" onClick={() => {
              if (user.role === 'admin') {
                handleEdit(player._id);
              } else {
                alert('Sòlo el administrador puede completar la acción');
              }
            }}>
              Editar
            </button>
            <button className="delete-button" onClick={() => {
              if (user.role === 'admin') {
                handleDelete();
              } else {
                alert('Sòlo el administrador puede completar la acción');
              }
            }}>
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayerCard;