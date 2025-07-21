import { useState } from 'react';
import { useAuth } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';

function CreatePlayer() {
  const { user } = useAuth(); 
  const [form, setForm] = useState({ name: '', position: '', nationality: '', region: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/historicplayers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to create player');
      alert('Jugador creado');
      navigate(`/region/${form.region}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return user ? (
    <form onSubmit={handleSubmit}>
      <h2>Create Player</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="position" placeholder="Position" onChange={handleChange} />
      <input name="nationality" placeholder="Nationality" onChange={handleChange} />
      <input name="region" placeholder="Region" onChange={handleChange} />
      <button type="submit">Crear</button>
    </form>
  ) : (<p>Debes estar logueado para crear jugadores.</p>)
}

export default CreatePlayer;