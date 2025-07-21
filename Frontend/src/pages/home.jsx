import { useState } from 'react';
import SearchBar from '../components/searchbar';
import PlayerCard from '../components/playercard';

function Home() {
  const [player, setPlayer] = useState(null);

  const searchPlayer = async (name) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/historicplayers/name/${name}`);
      if (!res.ok) throw new Error("Historic player not founded");
      const data = await res.json();
      setPlayer(data);
    } catch (error) {
      alert(error.message);
      setPlayer(null);
    }
  };

  return (
    <div>
      <h2>Buscar jugador histórico</h2>
      <SearchBar onSearch={searchPlayer} />
      {player && <PlayerCard player={player} />}
    </div>
  );
}

export default Home;
