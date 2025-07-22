
function PlayerCard({ player }) {
  return (
    <div className="player-card">
      <h3>{player.name}</h3>
      <p>Posición: {player.position}</p>
      <p>Nacionalidad: {player.nationality}</p>
      <p>Región: {player.region}</p>
    </div>
  );
}

export default PlayerCard;