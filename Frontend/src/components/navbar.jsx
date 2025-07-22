import { Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import './navbar.css';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className='navbar'>
      <Link to="/">Inicio</Link>
      <Link to="/region/america">Históricos de América</Link>
      <Link to="/region/europe">Históricos de Europa</Link>
      <Link to="/region/rest">Históricos de resto del mundo</Link>
      {user ? (
        <>
          <Link to="/create">Crear jugador</Link>
          <span>Hola, {user.username}!</span>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/register">Registrarse</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;

