import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/"); 
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/" className="logo-text">
            Lock<span className="accent">'era</span>
          </Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          {isLoggedIn && (
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </li>
          )}
        </ul>

        <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`dropdown ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link to="/nosotros" onClick={() => setMenuOpen(false)}>Nosotros</Link>
          <Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link>
          {isLoggedIn && (
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          )}
        </div>
      </nav>

      <div className={`overlay ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(false)}></div>
    </>
  );
}

export default Navbar;