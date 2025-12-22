import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaChartBar, FaLock, FaUser } from 'react-icons/fa';

const MonitoringLogin = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get credentials from environment variables
        const monitorUser = import.meta.env.VITE_MONITOR_USERNAME;
        const monitorPass = import.meta.env.VITE_MONITOR_PASSWORD;

        if (credentials.username === monitorUser && credentials.password === monitorPass) {
            // Create session with expiry time (30 minutes)
            const expiryTime = Date.now() + (30 * 60 * 1000);
            localStorage.setItem('monitorSession', JSON.stringify({
                authenticated: true,
                expiry: expiryTime
            }));
            navigate('/monitoring/dashboard');
        } else {
            setError(true);
        }
    };

    return (
        <div className="page monitoring-login-page" style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
                maxWidth: '400px',
                width: '100%',
                backgroundColor: 'var(--bg-secondary)',
                padding: '3rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '70px',
                        height: '70px',
                        backgroundColor: '#10B981', // Green for monitoring
                        borderRadius: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        color: 'white',
                        fontSize: '2rem'
                    }}>
                        <FaChartBar />
                    </div>
                    <h1 style={{ fontSize: '1.8rem' }}>{t.monitoring.loginTitle}</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Enter credentials to view analytics</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <div style={{ position: 'relative' }}>
                            <FaUser style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                placeholder={t.admin.username}
                                value={credentials.username}
                                onChange={(e) => { setCredentials({ ...credentials, username: e.target.value }); setError(false); }}
                                required
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    <div>
                        <div style={{ position: 'relative' }}>
                            <FaLock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="password"
                                placeholder={t.admin.password}
                                value={credentials.password}
                                onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }); setError(false); }}
                                required
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    {error && (
                        <p style={{ color: '#EF4444', fontSize: '0.875rem', textAlign: 'center' }}>{t.monitoring.error}</p>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', backgroundColor: '#10B981', borderColor: '#10B981' }}>
                        {t.admin.loginBtn}
                    </button>
                </form>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '1rem 1rem 1rem 3rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-main)',
    color: 'var(--text-main)',
    outline: 'none',
    transition: 'border-color 0.2s'
};

export default MonitoringLogin;
