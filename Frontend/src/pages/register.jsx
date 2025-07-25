import { useState } from 'react';
import { useAuth } from '../context/authcontext';

function Register() {
  const { register } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = form;

    try {
      const result = await register(username, email, password);
      setSuccessMessage("¡Registro exitoso!");
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.message);
      setSuccessMessage("Registro inválildo");
    }
  };

  return (
    <div className='container display-flex flex-between align-center flex-center gap-3 width-1'>
      <div className='register-text'>
        <h3 className='mayus h3 width-2'>
          Registrate en Players API y creá tu jugador histórico. Recordá que somos una API colaborativa, por lo que te pedimos que tu creación sea responsable y veraz
        </h3>
      </div>
      <div className='form-container'>
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form-title">Registrarse</h2>

          {errorMessage && <p className="form-error">{errorMessage}</p>}
          {successMessage && <p className="form-success">{successMessage}</p>}

          <input
            className="form-input"
            name="username"
            type="text"
            placeholder="Usuario"
            onChange={handleChange}
          />
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
          <button className="form-button" type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
