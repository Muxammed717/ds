import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaSearch, FaCheckCircle, FaTimesCircle, FaUserGraduate, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';

import { mockStudents } from '../data/students';

const Status = () => {
    const { t } = useLanguage();
    const [searchId, setSearchId] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setError(false);
        setResult(null);

        // Load latest data from localStorage or fallback
        const storedStudents = localStorage.getItem('datasite_students');
        const studentsSource = storedStudents ? JSON.parse(storedStudents) : mockStudents;

        // Simulate search delay for better UX
        setTimeout(() => {
            const student = studentsSource.find(s => s.id === searchId.toUpperCase());
            if (student) {
                setResult(student);
            } else {
                setError(true);
            }
        }, 500);
    };

    return (
        <div className="page status-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-main)' }}>
            <div className="container" style={{ maxWidth: '600px', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: 'var(--primary)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.5)'
                    }}>
                        <FaUserGraduate style={{ fontSize: '2.5rem', color: 'white' }} />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t.status?.title || 'Check Student Status'}</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{t.status?.subtitle || 'Enter your Student ID to check payment status and course details.'}</p>
                </div>

                <form onSubmit={handleSearch} style={{ position: 'relative', marginBottom: '3rem' }}>
                    <input
                        type="text"
                        placeholder={t.status?.placeholder || 'Enter Student ID (e.g. DS2025)'}
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1.25rem 1.5rem',
                            paddingRight: '120px',
                            borderRadius: 'var(--radius-full)',
                            border: '2px solid var(--border)',
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-main)',
                            fontSize: '1.1rem',
                            outline: 'none',
                            transition: 'border-color 0.2s, box-shadow 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        style={{
                            position: 'absolute',
                            right: '8px',
                            top: '8px',
                            bottom: '8px',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-full)',
                            padding: '0 2rem',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {t.status?.btn || 'Check'}
                    </button>
                </form>

                {error && (
                    <div style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#EF4444',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        textAlign: 'center',
                        animation: 'fadeIn 0.3s ease'
                    }}>
                        <FaTimesCircle style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block', margin: '0 auto 0.5rem' }} />
                        <strong>{t.status?.notFound || 'Student Not Found'}</strong>
                        <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>{t.status?.notFoundDesc || 'Please check your ID and try again.'}</p>
                    </div>
                )}

                {result && (
                    <div style={{
                        backgroundColor: 'var(--bg-secondary)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border)',
                        animation: 'fadeIn 0.5s ease'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                backgroundColor: 'var(--bg-main)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                color: 'var(--text-secondary)'
                            }}>
                                <FaUserGraduate />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{result.name}</h3>
                                <p style={{ color: 'var(--primary)', fontWeight: 500 }}>{result.id}</p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>{t.status?.course || 'Course'}:</span>
                                <span style={{ fontWeight: 600 }}>{result.course}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>{t.status?.paymentStatus || 'Payment Status'}:</span>
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '1rem',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    backgroundColor: result.status === 'paid' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: result.status === 'paid' ? '#10B981' : '#EF4444',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    {result.status === 'paid' ? <FaCheckCircle /> : <FaTimesCircle />}
                                    {result.status === 'paid' ? (t.status?.paid || 'Paid') : (t.status?.unpaid || 'Unpaid')}
                                </span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>{t.status?.nextPayment || 'Next Payment'}:</span>
                                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaCalendarAlt style={{ color: 'var(--text-secondary)' }} />
                                    {result.nextPayment}
                                </span>
                            </div>
                        </div>

                        {result.status === 'unpaid' && (
                            <div style={{ marginTop: '2rem' }}>
                                <button className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <FaMoneyBillWave /> {t.status?.payNow || 'Pay Now'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}
            </style>
        </div>
    );
};

export default Status;
