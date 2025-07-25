import { useState } from 'react';
import { useAuth } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      await login(email, password);
      navigate('/create');
    } catch (err) {
      setErrorMessage(err.message || "Usuario no registrado");
    }
  };

  return (
    <div className='container display-flex flex-between align-center flex-center gap-3 width-1'>
      <div className='login-text'>
        <h3 className='mayus h3 width-2'>
          Bienvenido a Players API, la aplicación que te convertirá en un experto del fútbol. Aquí podrás acceder a datos de los mejores jugadores de la historia del deporte más popular del mundo
        </h3>
      </div>
      <div className='form-container'>
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">Iniciar sesión</h2>

      {errorMessage && <p className="form-error">{errorMessage}</p>}
      {successMessage && <p className="form-success">{successMessage}</p>}

      <input
        className="form-input"
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        className="form-input"
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={handleChange}
      />
      <button className="form-button" type="submit">Iniciar sesión</button>
    </form>
    </div>
    </div>
  );
}
export default Login;