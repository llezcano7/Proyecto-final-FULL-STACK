import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from 'react';
import './navbar.css'

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
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

  const logoSrc = darkMode ? '/logoapi-2.png' : '/logoapi-1.png';

  return (
    <header className="container bg-1 display-flex flex-between align-center width-1">
      <Link className='logo' to="/">
        <img src={logoSrc} alt="Logo principal de Players API" />
      </Link>
      <div>
        <GiHamburgerMenu className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú" />
      </div>
      <nav className={`navbar ${menuOpen ? 'open' : ''} display-flex flex-between align-center pointer pd-inline-1 gap-2`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">✕</button>
        <Link className='region mayus' to="/region/america" onClick={() => setMenuOpen(false)}>Players de América</Link>
        <Link className='region mayus' to="/region/europa" onClick={() => setMenuOpen(false)}>Players de Europa</Link>
        <Link className='region mayus' to="/region/rest" onClick={() => setMenuOpen(false)}>Players de Resto del Mundo</Link>
        {user && (
          <>
            <Link className="btn" to="/create" onClick={() => setMenuOpen(false)}>Crear Player</Link>
          </>
        )}
      </nav>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="theme-toggle" aria-label="Cambiar tema"
      >
        {darkMode ? <BsSunFill className='icon' /> : <BsMoonStarsFill className='icon' />}
      </button>
      {user ? (
        <>
          <Link className="btn" onClick={handleLogout}>Cerrar sesión</Link>
        </>
      ) : (
        <>
          <div className='auth-links display-flex flex-between align-center gap-1'>
            <Link className='btn' to="/login" onClick={() => setMenuOpen(false)}>Iniciar sesión</Link>
            <Link className='btn' to="/register" onClick={() => setMenuOpen(false)}>Registrarse</Link>
          </div>
        </>
      )}
    </header >
  );
}
export default Navbar;