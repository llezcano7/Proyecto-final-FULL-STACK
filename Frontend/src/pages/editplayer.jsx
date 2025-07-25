import { useEffect, useState } from 'react';
import { useAuth } from '../context/authcontext';
import { useParams, useNavigate } from 'react-router-dom';
import PlayerCard from '../components/playercard';

function EditPlayer() {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/historicplayers/${id}`);
                const data = await res.json();
                setForm(data);
            } catch (err) {
                alert('Error al cargar jugador');
            } finally {
                setLoading(false);
            }
        };
        fetchPlayer();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/historicplayers/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('Error al actualizar jugador');
            alert('Jugador actualizado');
            navigate(`/region/${form.region}`);
        } catch (err) {
            alert(err.message);
        }
    };

    if (!user) return <p>Debes estar logueado para editar jugadores.</p>;
    if (loading) return <p>Cargando jugador...</p>;
    if (!form) return <p>No se encontró el jugador.</p>;

    return (
        <div className='editor-container container display-flex flex-column align-center flex-center'>

            <div className='container width-1 display-flex align-center'>
                <div className='pd-left-6'>
                    <PlayerCard player={form} showActions={false} />
                </div>
                <form className='form width-2' onSubmit={handleUpdate}>
                    <h2 className="form-title">Editar Jugador</h2>
                    <input className='form-input' name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                    <input className='form-input' name="position" placeholder="Position" value={form.position} onChange={handleChange} />
                    <input className='form-input' name="nationality" placeholder="Nationality" value={form.nationality} onChange={handleChange} />
                    <input className='form-input' name="region" placeholder="Region" value={form.region} onChange={handleChange} />
                    <input className='form-input' name="teams" placeholder="Teams" value={form.teams} onChange={handleChange} />
                    <input className='form-input' name="worldCup" placeholder="World Cup" value={form.worldCup} onChange={handleChange} />
                    <input className='form-input' name="data" placeholder="Data" value={form.data} onChange={handleChange} />
                    <button className='form-button' type="submit">Actualizar</button>
                </form>
            </div>
        </div>
    );
}

export default EditPlayer;