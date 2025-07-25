import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import './navbar.css'

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };


  return (
    <header className="container bg-1 display-flex flex-between align-center width-1">
      <Link className='logo' to="/">
        <img src="/logoapi-1.png" alt="Logo principal de Players API" />
      </Link>
      <nav className="navbar display-flex flex-between align-center pointer pd-inline-1 gap-2">
        <Link className='mayus' to="/region/america">Players de América</Link>
        <Link className='mayus' to="/region/europa">Players de Europa</Link>
        <Link className='mayus' to="/region/rest">Players de Resto del Mundo</Link>
        {user && (
          <Link className="mayus" to="/create">Crear Player</Link>
        )}
      </nav>
      {user ? (
        <>
          <span className="mayus">Hola, {user.username}!</span>
          <Link className="btn" onClick={handleLogout}>Cerrar sesión</Link>
        </>
      ) : (
        <>
          <div className='auth-links display-flex flex-between align-center gap-2'>
            <Link className='btn' to="/login">Iniciar sesión</Link>
            <Link className='btn' to="/register">Registrarse</Link>
          </div>
        </>
      )}
    </header >
  );
}
export default Navbar;