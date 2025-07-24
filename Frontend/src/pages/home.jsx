import { useState } from 'react';
import SearchBar from '../components/searchbar';
import PlayerCard from '../components/playercard';
import '../home.css';

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
    <>
      <div className='home-bg'>
        <SearchBar onSearch={searchPlayer} />
        {player && <PlayerCard player={player} />}
      </div>
      <div className='separator display-flex flex-center align-center pd-block-5 width-1'>
        <h2 className='mayus'> Porqué <span className='mayus'>players api</span> </h2>
      </div>
      <div className='info-bg'>
        <div className='container width-1 display-flex flex-between align-center gap-4 pd-block-6'>
          <div className='info-text'>
            <h3 className='mayus'>Estadísticas detalladas de futbolistas que han marcado una época</h3>
          </div>
          <ul className='info-list'>
            <li>3.500 millones de fans</li>
            <p className='mayus'>Considerado el deporte más popular del mundo</p>
            <li>1.500 millones de viewers</li>
            <p className='mayus'>sinotnizando día a día partidos de fútbol</p>
            <li>Más de 200 territorios</li>
            <p className='mayus'>donde se celebran partidos oficiales del deporte rey</p>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
