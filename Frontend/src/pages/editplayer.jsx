import { useEffect, useState } from 'react';
import { useAuth } from '../context/authcontext';
import { useParams, useNavigate } from 'react-router-dom';
import PlayerCard from '../components/playercard';

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
        world_cup: '',
        data: ''
    });

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/historicplayers/${id}`);
                const data = await res.json();
                setForm(data.data);
            } catch (err) {
                alert('Error al cargar jugador');
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
            console.log(id)
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
                    <input className='form-input' name="world_cup" placeholder="World Cup" value={form.world_cup} onChange={handleChange} />
                    <input className='form-input' name="data" placeholder="Data" value={form.data} onChange={handleChange} />
                    <button className='form-button' type="submit">Actualizar</button>
                </form>
            </div>
        </div>
    );
}

export default EditPlayer;