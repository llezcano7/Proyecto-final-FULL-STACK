import React from 'react';
import './playercard.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaTrophy } from 'react-icons/fa'; 

function PlayerCard({ player }) {
  return (
    <div className="player-card">
      <div className="header-row">
        <h3>{player.name}</h3>
        {player.position && <div className="position-tag">{player.position}</div>}
      </div>

      {player.nationality && ( // Assuming nationality corresponds to the location
        <p className="info-line">
          <FaMapMarkerAlt className="icon" /> {/* Location icon */}
          {player.nationality}
        </p>
      )}

      {(player.birthYear || player.deathYear) && ( // Assuming these properties for dates
        <p className="info-line">
          <FaCalendarAlt className="icon" /> {/* Calendar icon */}
          {player.birthYear} - {player.deathYear}
        </p>
      )}

      {(player.worldCupsCount || (player.worldCupYears && player.worldCupYears.length > 0)) && (
        <p className="info-line">
          <FaTrophy className="icon" /> {/* Trophy icon */}
          {player.worldCupsCount}x Campeón del Mundo {player.worldCupYears && `(${player.worldCupYears.join(', ')})`}
        </p>
      )}

      {player.description && (
        <p className="description">
          {player.description}
        </p>
      )}

      {player.mainClubs && player.mainClubs.length > 0 && (
        <div className="clubs-section">
          {player.mainClubs.map((club, index) => (
            <span key={index} className="club-tag">
              {club}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlayerCard;