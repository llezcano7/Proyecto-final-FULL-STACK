import { useState } from 'react';
import SearchBar from '../components/searchbar';
import PlayerCard from '../components/playercard';
import './home.css';

function Home() {
  const [players, setPlayers] = useState([]);

  const searchPlayer = async (name) => {
    const trimmed = name.trim();
    if (trimmed === "") {
      setPlayers([]);
      return;
    }
    console.log("Buscando jugador:", name);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/historicplayers/name/${name}`);
      if (!res.ok) throw new Error("Error en la búsqueda");
      const data = await res.json();

      const playerArray = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data)
          ? data
          : [];

      if (playerArray.length === 0) {
        throw new Error("No se encontraron jugadores con ese nombre.");
      }

      setPlayers(playerArray);
    } catch (error) {
      alert(error.message);
      setPlayers([]);
    }
  };

  return (
    <>
      <div className='home-bg display-flex flex-column gap-2'>
        <div>
          <h1 className='home-text mayus display-flex flex-center align-center'> Encontrá todos los futbolistas aquí. El que no encuentres ¡registrate y crealo!</h1>
        </div>
        <SearchBar onSearch={searchPlayer} />
        {players.length > 0 && (
          <div className="display-flex flex-center gap-2 mt-2">
            {players.slice(0, 3).map(player => (
              <PlayerCard key={player._id || player.name} player={player} />
            ))}
          </div>
        )}
      </div>

      <div className='separator display-flex flex-center align-center pd-block-4 width-1'>
        <h2 className='mayus'> Porqué <span className='mayus separator-span'>players api</span> </h2>
      </div>

      <div className='info-bg'>
        <div className='container width-1 display-flex flex-between align-center gap-5 pd-block-6'>
          <div className='info-text'>
            <h3 className='mayus'>Estadísticas detalladas de futbolistas que han marcado una época</h3>
          </div>
          <ul className='info-list'>
            <li>3.500 millones de fans</li>
            <p className='mayus'>Considerado el deporte más popular del mundo</p>
            <li>Millones de viewers</li>
            <p className='mayus'>sintonizando día a día partidos de fútbol</p>
            <li>Más de 200 territorios</li>
            <p className='mayus'>donde se celebran partidos oficiales del deporte rey</p>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;