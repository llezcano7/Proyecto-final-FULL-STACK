import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import './navbar.css'

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

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
          <>
          <Link className="btn" to="/create">Crear Player</Link>
          </>
        )}
      </nav>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="theme-toggle"
        aria-label="Cambiar tema"
      >
        {darkMode ? <BsSunFill size={22} /> : <BsMoonStarsFill size={22} />}
      </button>
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