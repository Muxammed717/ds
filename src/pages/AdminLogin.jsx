import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaLock, FaUser, FaShieldAlt } from 'react-icons/fa';

const AdminLogin = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setError(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Hardcoded admin credentials
        const adminUser = "admin";
        const adminPass = "admin123";

        if (credentials.username === adminUser && credentials.password === adminPass) {
            const expiryTime = Date.now() + (30 * 60 * 1000);
            localStorage.setItem('adminSession', JSON.stringify({
                authenticated: true,
                expiry: expiryTime
            }));
            navigate('/admin/dashboard');
        } else {
            setError(true);
        }
    };

    return (
        <div className="admin-login-page" style={pageStyle}>
            <div style={cardStyle}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={badge}>ADMINISTRATIVE CONSOLE</div>
                    <h1 style={titleStyle}>{t.admin.loginTitle.toUpperCase()}</h1>
                    <p style={subtitle}>SECURE GATEWAY v4.1.0 // ACCESS CONTROL</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={inputContainer}>
                        <label style={label}>{t.admin.username.toUpperCase()}</label>
                        <div style={inputWrapper}>
                            <FaUser style={icon} />
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div style={inputContainer}>
                        <label style={label}>{t.admin.password.toUpperCase()}</label>
                        <div style={inputWrapper}>
                            <FaLock style={icon} />
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    {error && (
                        <div style={errorBox}>
                            {t.admin.error.toUpperCase()}
                        </div>
                    )}

                    <button type="submit" style={button}>
                        VALIDATE ACCESS
                    </button>

                    <div style={footerText}>
                        SECURITY PROTOCOL ACTIVE. UNAUTHORIZED ATTEMPTS ARE MONITORED.
                    </div>
                </form>
            </div>
        </div>
    );
};

const pageStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
    fontFamily: "'Inter', sans-serif"
};

const cardStyle = {
    maxWidth: '400px',
    width: '100%',
    padding: '4rem',
    backgroundColor: '#111827',
    border: '1px solid #1e293b',
    borderRadius: '4px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
};

const badge = {
    fontSize: '0.6rem',
    fontWeight: 900,
    color: '#ef4444',
    letterSpacing: '2px',
    marginBottom: '0.5rem'
};

const titleStyle = {
    fontSize: '1.25rem',
    color: '#f8fafc',
    fontWeight: 800,
    letterSpacing: '1px',
    margin: 0
};

const subtitle = {
    fontSize: '0.6rem',
    color: '#475569',
    marginTop: '0.5rem',
    letterSpacing: '1px'
};

const inputContainer = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
};

const label = {
    fontSize: '0.65rem',
    fontWeight: 800,
    color: '#64748b',
    letterSpacing: '1px'
};

const inputWrapper = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
};

const icon = {
    position: 'absolute',
    left: '1rem',
    color: '#334155',
    fontSize: '0.9rem'
};

const inputStyle = {
    width: '100%',
    padding: '1rem 1rem 1rem 2.75rem',
    backgroundColor: '#0a0a0a',
    border: '1px solid #1e293b',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '0.85rem',
    fontFamily: 'monospace',
    outline: 'none',
    transition: 'border-color 0.2s'
};

const button = {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#1e293b',
    color: '#f1f5f9',
    border: '1px solid #334155',
    borderRadius: '4px',
    fontWeight: 800,
    fontSize: '0.8rem',
    letterSpacing: '1.5px',
    cursor: 'pointer',
    marginTop: '1.5rem',
    transition: 'background-color 0.2s'
};

const errorBox = {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    padding: '1rem',
    borderRadius: '4px',
    fontSize: '0.7rem',
    fontWeight: 800,
    textAlign: 'center',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    fontFamily: 'monospace'
};

const footerText = {
    fontSize: '0.6rem',
    color: '#334155',
    textAlign: 'center',
    marginTop: '1.5rem',
    lineHeight: '1.5',
    fontWeight: 600
};

export default AdminLogin;
