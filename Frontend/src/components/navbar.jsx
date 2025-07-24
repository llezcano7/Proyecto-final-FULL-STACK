import { Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import './navbar.css'

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="container bg-1 display-flex flex-between align-center width-1">
      <Link className='logo' to="/">
        <img src="/logoapi-1.png" alt="Logo principal de Players API" />
      </Link>
      <nav className="navbar">
        <Link className='mayus' to="/region/america">Players de América</Link>
        <Link className='mayus' to="/region/europe">Players de Europa</Link>
        <Link className='mayus' to="/region/rest">Players de Resto del Mundo</Link>
        {user && (
          <Link but className="mayus" to="/create">Crear Player</Link>
        )}
      </nav>
        {user ? (
          <>
            <span className="navbar-user">Hola, {user.username}!</span>
            <Link className="btn" onClick={logout}>Cerrar sesión</Link>
          </>
        ) : (
          <>
          <div className='auth-links'>
            <Link className='btn' to="/login">Iniciar sesión</Link>
            <Link className='btn' to="/register">Registrarse</Link>
          </div>
          </>
        )}
    </header >
  );
}
export default Navbar;