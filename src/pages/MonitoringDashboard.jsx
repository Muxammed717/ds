import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { mockStudents as initialStudents } from '../data/students';
import { coursesData } from '../data/courses';
import { FaUsers, FaMoneyBillWave, FaBookOpen, FaChartPie, FaSignOutAlt, FaArrowUp } from 'react-icons/fa';

const MonitoringDashboard = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalRevenue: 0,
        activeCourses: 0,
        paidCount: 0,
        unpaidCount: 0,
        courseDistribution: {}
    });

    useEffect(() => {
        // Check session validity
        const session = localStorage.getItem('monitorSession');

        if (!session) {
            navigate('/monitoring');
            return;
        }

        try {
            const { authenticated, expiry } = JSON.parse(session);

            // Check if session expired
            if (!authenticated || Date.now() > expiry) {
                localStorage.removeItem('monitorSession');
                navigate('/monitoring');
                return;
            }
        } catch (error) {
            // Invalid session data
            localStorage.removeItem('monitorSession');
            navigate('/monitoring');
            return;
        }

        // Get latest student data from localStorage or fallback
        const storedStudents = localStorage.getItem('datasite_students');
        const students = storedStudents ? JSON.parse(storedStudents) : initialStudents;

        // Calculate Stats
        const paid = students.filter(s => s.status === 'paid');
        const unpaid = students.filter(s => s.status === 'unpaid' || s.status === 'pending');

        // Mock Revenue calculation: assuming average 1,000,000 UZS per paid student
        const revenue = paid.length * 1000000;

        // Course Distribution
        const dist = {};
        students.forEach(s => {
            dist[s.course] = (dist[s.course] || 0) + 1;
        });

        setStats({
            totalStudents: students.length,
            totalRevenue: revenue,
            activeCourses: coursesData.length,
            paidCount: paid.length,
            unpaidCount: unpaid.length,
            courseDistribution: dist
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('monitorSession');
        navigate('/monitoring');
    };

    return (
        <div className="page monitoring-dashboard" style={{ padding: '3rem 0', backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{t.monitoring.title}</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>{t.monitoring.subtitle}</p>
                    </div>
                    <button className="btn btn-outline" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaSignOutAlt /> {t.admin.saveBtn.includes('Save') ? 'Logout' : 'Chiqish'}
                    </button>
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <StatCard icon={<FaUsers />} title={t.monitoring.stats.totalStudents} value={stats.totalStudents} color="#3B82F6" />
                    <StatCard icon={<FaMoneyBillWave />} title={t.monitoring.stats.totalRevenue} value={stats.totalRevenue.toLocaleString() + ' UZS'} color="#10B981" />
                    <StatCard icon={<FaBookOpen />} title={t.monitoring.stats.activeCourses} value={stats.activeCourses} color="#8B5CF6" />
                    <StatCard icon={<FaChartPie />} title={t.monitoring.stats.paidStudents} value={stats.paidCount} color="#F59E0B" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                    {/* Course Distribution Table */}
                    <div style={panelStyle}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaBookOpen style={{ color: 'var(--primary)' }} /> {t.monitoring.charts.studentDist}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {Object.entries(stats.courseDistribution).map(([course, count]) => (
                                <div key={course}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                        <span>{course}</span>
                                        <span style={{ fontWeight: 700 }}>{count}</span>
                                    </div>
                                    <div style={{ height: '8px', backgroundColor: 'var(--bg-main)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${(count / stats.totalStudents) * 100}%`,
                                            height: '100%',
                                            backgroundColor: 'var(--primary)',
                                            transition: 'width 1s ease-out'
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Status Summary */}
                    <div style={panelStyle}>
                        <h3 style={{ marginBottom: '1.5rem' }}>{t.monitoring.charts.paymentStats}</h3>
                        <div style={{ display: 'flex', height: '160px', alignItems: 'flex-end', gap: '2rem', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '60px',
                                    height: `${(stats.paidCount / stats.totalStudents) * 150}px`,
                                    backgroundColor: '#10B981',
                                    borderRadius: '8px 8px 0 0',
                                    margin: '0 auto 0.5rem'
                                }} />
                                <span style={{ fontSize: '0.8rem' }}>{t.monitoring.stats.paidStudents}</span>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '60px',
                                    height: `${(stats.unpaidCount / stats.totalStudents) * 150}px`,
                                    backgroundColor: '#EF4444',
                                    borderRadius: '8px 8px 0 0',
                                    margin: '0 auto 0.5rem'
                                }} />
                                <span style={{ fontSize: '0.8rem' }}>{t.monitoring.stats.unpaidStudents}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value, color }) => (
    <div style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: '1.5rem',
        borderRadius: '1.25rem',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem'
    }}>
        <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '1rem',
            backgroundColor: `${color}20`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
        }}>
            {icon}
        </div>
        <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{title}</p>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{value}</h4>
        </div>
    </div>
);

const panelStyle = {
    backgroundColor: 'var(--bg-secondary)',
    padding: '2rem',
    borderRadius: '1.5rem',
    border: '1px solid var(--border)'
};

export default MonitoringDashboard;
