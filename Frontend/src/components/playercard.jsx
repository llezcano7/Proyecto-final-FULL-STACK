import { FaTrophy } from "react-icons/fa";
import { FaFutbol } from "react-icons/fa";
import { useState, useEffect } from 'react';
import './playercard.css';

const formatPosition = (position) => {
  return position
    ? position.charAt(0).toUpperCase() + position.slice(1)
    : "Posición desconocida";
};

const positionColors = {
  arquero: '#1e90ff',      // azul
  defensor: '#28a745',     // verde
  mediocampista: '#ffc107',// amarillo
  delantero: '#dc3545',    // rojo
};

function PlayerCard({ player }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (
    !player ||
    !player.name ||
    !player.position ||
    !player.nationality ||
    !player.region ||
    !player.teams ||
    !player.world_cup ||
    !player.data
  ) {
    return null;
  }

  const { name, position, nationality, region, teams, world_cup, data } = player;
  const borderColor = positionColors[position.toLowerCase()] || '#ccc';

  return (
    <div className="player-container grid drid-cols-3">
      <div className={`player-card ${visible ? 'visible' : ''}`} style={{ borderColor }}>
        <h3 className="player-name">{name}</h3>

        <div className="player-row">
          <FaFutbol className="icon"/>
          <span className="position-highlight">{formatPosition(position)}</span>
        </div>

        <div className="player-row">
          <strong>Nacionalidad:</strong> {nationality.charAt(0).toUpperCase() + nationality.slice(1)}
        </div>

        <div className="player-row">
          <strong>Región:</strong> {region.charAt(0).toUpperCase() + region.slice(1)}
        </div>

        <div className="player-row">
          <strong>Equipos:</strong> {Array.isArray(teams) ? teams.join(', ') : teams}
        </div>

        <div className="player-row">
          <FaTrophy  className="icon" />
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
      </div>
    </div>
  );
}

export default PlayerCard;
