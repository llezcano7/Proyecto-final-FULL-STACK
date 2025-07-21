import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function Region() {
  const { region } = useParams();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Región actual:", region);
    const fetchPlayers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/historicplayers/region/${region}`);
        const data = await res.json();
        setPlayers(data);
      } catch (error) {
        console.log("Error al obtener jugadores", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, [region]);
}

export default Region;