import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaLock, FaUser } from 'react-icons/fa';

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

        // Get credentials from environment variables
        const adminUser = import.meta.env.VITE_ADMIN_USERNAME;
        const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;

        if (credentials.username === adminUser && credentials.password === adminPass) {
            // Create session with expiry time (30 minutes)
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
        <div className="page admin-login-page" style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
                maxWidth: '400px',
                width: '100%',
                backgroundColor: 'var(--bg-secondary)',
                padding: '3rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: 'var(--primary)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        color: 'white',
                        fontSize: '1.5rem'
                    }}>
                        <FaLock />
                    </div>
                    <h1 style={{ fontSize: '2rem' }}>{t.admin.loginTitle}</h1>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>{t.admin.username}</label>
                        <div style={{ position: 'relative' }}>
                            <FaUser style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 3rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border)',
                                    backgroundColor: 'var(--bg-main)',
                                    color: 'var(--text-main)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>{t.admin.password}</label>
                        <div style={{ position: 'relative' }}>
                            <FaLock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 3rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border)',
                                    backgroundColor: 'var(--bg-main)',
                                    color: 'var(--text-main)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    {error && (
                        <p style={{ color: '#EF4444', fontSize: '0.875rem', textAlign: 'center' }}>{t.admin.error}</p>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
                        {t.admin.loginBtn}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
