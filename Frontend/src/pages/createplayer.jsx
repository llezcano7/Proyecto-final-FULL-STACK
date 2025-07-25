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
    <div className='display-flex flex-between align-center flex-center container width-1'>
    <form className='form width-2 pd-right-4' onSubmit={handleSubmit}>
      <h2 className="form-title">Crear Player</h2>
      <input className='form-input' name="name" placeholder="Name" onChange={handleChange} />
      <input className='form-input' name="position" placeholder="Position" onChange={handleChange} />
      <input className='form-input' name="nationality" placeholder="Nationality" onChange={handleChange} />
      <input className='form-input' name="region" placeholder="Region" onChange={handleChange} />
      <input className='form-input' name="region" placeholder="Teams" onChange={handleChange} />
      <input className='form-input' name="region" placeholder="World Cup" onChange={handleChange} />
      <input className='form-input' name="region" placeholder="Data" onChange={handleChange} />

      <button className='form-button' type="submit">Crear</button>
    </form>
    <div>
        <h3 className='h3 mayus width-2 pd-left-6'>Formá parte de la historia grande del fútbol, creando el futbolista que consideres que debe estar en Players API</h3>
      </div>
    </div>
  ) : (<p>Debes estar logueado para crear jugadores.</p>)
}

export default CreatePlayer;