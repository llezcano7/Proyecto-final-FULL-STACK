import { useEffect, useState } from 'react'; 
import { useAuth } from '../context/authcontext';
import { useParams, useNavigate } from 'react-router-dom';

function EditPlayer() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    position: '',
    nationality: '',
    region: '',
    teams: '',
    worldCup: '',
    data: ''
  });

  useEffect(() => {
    const fetchPlayer = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/historicplayers/${id}`);
      const data = await res.json();

      setForm({
        ...data,
        teams: Array.isArray(data.teams) ? data.teams.join(', ') : data.teams || '',
        worldCup: Array.isArray(data.world_cup) ? data.world_cup.join(', ') : data.world_cup || ''
      });
    };
    fetchPlayer();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedForm = {
        ...form,
        teams: form.teams.split(',').map(team => team.trim()),
        world_cup: form.worldCup.split(',').map(cup => cup.trim()),
      };

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/historicplayers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedForm),
      });

      if (!res.ok) throw new Error('Error al actualizar jugador');
      alert('Jugador actualizado');
      navigate(`/region/${form.region}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return user ? (
    <form className='form' onSubmit={handleUpdate}>
      <h2 className="form-title">Editar Player</h2>
      <input className='form-input' name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input className='form-input' name="position" placeholder="Position" value={form.position} onChange={handleChange} />
      <input className='form-input' name="nationality" placeholder="Nationality" value={form.nationality} onChange={handleChange} />
      <input className='form-input' name="region" placeholder="Region" value={form.region} onChange={handleChange} />
      <input className='form-input' name="teams" placeholder="Teams (separados por coma)" value={form.teams} onChange={handleChange} />
      <input className='form-input' name="worldCup" placeholder="World Cups (separadas por coma)" value={form.worldCup} onChange={handleChange} />
      <input className='form-input' name="data" placeholder="Data" value={form.data} onChange={handleChange} />

      <button className='form-button' type="submit">Actualizar</button>
    </form>
  ) : (
    <p>Debes estar logueado para editar jugadores.</p>
  );
}

export default EditPlayer;