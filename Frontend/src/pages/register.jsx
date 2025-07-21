import { useState } from 'react';
import { useAuth } from '../context/authcontext';


function Register() {

  const { register } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = form;

    try {
       await register(username, email, password)
    }
    catch (err) {
    setErrorMessage(err.message);
    }
  };

  {errorMessage && <p className="error">{errorMessage}</p>}


  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input name="username" type="text" placeholder="Usuario" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default Register;