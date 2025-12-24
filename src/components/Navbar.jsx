import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSnowflake } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo-container">
          <div className="logo-icon">
            <FaSnowflake
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                color: '#0ea5e9',
                fontSize: '14px',
                animation: 'spin 4s linear infinite'
              }}
            />
            DS
          </div>
          <div className="logo-text">
            <span className="logo-main">DataSite</span>
            <span className="logo-sub">ACADEMY</span>
          </div>
        </Link>
        <style>{`
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `}</style>

        {/* Desktop Language Switcher - Visible on desktop */}
        <div style={{ marginLeft: 'auto', marginRight: '1rem', display: 'none' }} className="desktop-lang-switch">
          <button
            onClick={toggleLanguage}
            style={{
              background: 'none',
              border: '1px solid var(--primary)',
              borderRadius: '4px',
              padding: '0.25rem 0.5rem',
              cursor: 'pointer',
              color: 'var(--primary)',
              fontWeight: 600
            }}
          >
            {language === 'uz' ? 'EN' : 'UZ'}
          </button>
        </div>

        <div className="mobile-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={toggleMenu}>{t.nav.home}</Link>
          </li>
          <li className="nav-item">
            <Link to="/courses" className="nav-link" onClick={toggleMenu}>{t.nav.courses}</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={toggleMenu}>{t.nav.about}</Link>
          </li>
          <li className="nav-item">
            <Link to="/status" className="nav-link" onClick={toggleMenu}>{t.nav.status}</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={toggleMenu}>{t.nav.contact}</Link>
          </li>
          <li className="nav-item">
            <button
              onClick={() => { toggleLanguage(); toggleMenu(); }}
              style={{
                background: 'var(--bg-secondary)',
                border: 'none',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                color: 'var(--primary)',
                fontWeight: 600,
                width: '100%',
                textAlign: 'left',
                marginTop: '0.5rem' // Add spacing for mobile
              }}
              className="mobile-lang-switch"
            >
              {language === 'uz' ? 'English' : 'O\'zbekcha'}
            </button>
          </li>
          <li className="nav-item">
            <Link to="/courses" className="btn btn-primary nav-btn" onClick={toggleMenu}>{t.nav.getStarted}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
