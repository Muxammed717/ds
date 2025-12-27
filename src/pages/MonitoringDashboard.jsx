import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { mockStudents as initialStudents } from '../data/students';
import { coursesData } from '../data/courses';
import {
    FaUsers, FaMoneyBillWave, FaBookOpen, FaChartPie,
    FaSignOutAlt, FaShieldAlt, FaDatabase
} from 'react-icons/fa';

const MonitoringDashboard = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalRevenue: 0,
        activeCourses: 0,
        paidCount: 0,

        
        unpaidCount: 0,
        courseDistribution: {},
        groupPerformance: []
    });

    useEffect(() => {
        const session = localStorage.getItem('monitorSession');
        if (!session) { navigate('/monitoring'); return; }

        const storedStudents = localStorage.getItem('datasite_students');
        const students = storedStudents ? JSON.parse(storedStudents) : initialStudents;

        const storedGroups = localStorage.getItem('datasite_groups');
        const groups = storedGroups ? JSON.parse(storedGroups) : [];

        const paid = students.filter(s => s.status === 'paid');
        const dist = {};
        students.forEach(s => { dist[s.course] = (dist[s.course] || 0) + 1; });

        const totalRev = students.reduce((acc, s) => acc + (parseInt(s.totalPaid) || 0), 0);

        setStats({
            totalStudents: students.length,
            totalRevenue: totalRev,
            activeCourses: coursesData.length,
            paidCount: paid.length,
            unpaidCount: students.length - paid.length,
            courseDistribution: dist,
            groupPerformance: groups.sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
        });
    }, [navigate]);

    return (
        <div className="monitoring-page" style={pageStyle}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <header style={headerStyle}>
                    <div>
                        <h1 style={titleStyle}>{t.monitoring.title.toUpperCase()}</h1>
                        <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.5rem' }}>{t.monitoring.subtitle}</p>
                    </div>
                    <button style={logoutBtn} onClick={() => { localStorage.removeItem('monitorSession'); navigate('/monitoring'); }}>
                        <FaSignOutAlt /> {t.admin.close}
                    </button>
                </header>

                <div style={topGrid}>
                    <QuickStat label={t.monitoring.stats.totalStudents} value={stats.totalStudents} color="#f1f5f9" icon={<FaUsers />} />
                    <QuickStat label={t.monitoring.stats.totalRevenue} value={new Intl.NumberFormat('uz-UZ').format(stats.totalRevenue)} sub="UZS" color="#10b981" icon={<FaMoneyBillWave />} />
                    <QuickStat label={t.monitoring.stats.paidStudents} value={stats.paidCount} color="#10b981" icon={<FaChartPie />} />
                    <QuickStat label={t.monitoring.stats.unpaidStudents} value={stats.unpaidCount} color="#ef4444" icon={<FaShieldAlt />} />
                </div>

                <div style={mainLayout}>
                    <div style={panel}>
                        <h3 style={panelTitle}><FaDatabase /> {t.admin.groupRevenue}</h3>
                        <div style={distList}>
                            {stats.groupPerformance.map((group) => (
                                <div key={group.id} style={distItem}>
                                    <div style={distHeader}>
                                        <span style={distName}>{group.name}</span>
                                        <span style={{ ...distValue, color: '#10b981' }}>{new Intl.NumberFormat('uz-UZ').format(group.revenue || 0)} UZS</span>
                                    </div>
                                    <div style={progBarBg}>
                                        <div style={{ ...progBar, width: `${stats.totalRevenue > 0 ? ((group.revenue || 0) / stats.totalRevenue) * 100 : 0}%`, backgroundColor: '#10b981' }}></div>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>{t.admin.teacher}: {group.teacherName}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={panel}>
                        <h3 style={panelTitle}><FaBookOpen /> {t.monitoring.charts.studentDist}</h3>
                        <div style={distList}>
                            {Object.entries(stats.courseDistribution).map(([course, count]) => (
                                <div key={course} style={distItem}>
                                    <div style={distHeader}>
                                        <span style={distName}>{course}</span>
                                        <span style={distValue}>{count} {t.admin.groupStudents}</span>
                                    </div>
                                    <div style={progBarBg}>
                                        <div style={{ ...progBar, width: `${stats.totalStudents > 0 ? (count / stats.totalStudents) * 100 : 0}%`, backgroundColor: 'var(--primary)' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-components
const QuickStat = ({ label, value, sub, color, icon }) => (
    <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={cardLabel}>{label}</div>
            <div style={{ color: color || '#64748b', fontSize: '1.25rem' }}>{icon}</div>
        </div>
        <div style={{ ...cardValue, color: color || '#f8fafc' }}>{value} <span style={cardSub}>{sub}</span></div>
    </div>
);

// Styles
const pageStyle = {
    backgroundColor: '#0a0a0a',
    color: '#e2e8f0',
    minHeight: '100vh',
    padding: '2rem 0',
    fontFamily: "'Inter', 'JetBrains Mono', monospace",
    letterSpacing: '-0.2px'
};

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2.5rem',
    borderBottom: '1px solid #1e293b',
    paddingBottom: '1.5rem'
};

const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#f1f5f9',
    margin: 0
};

const logoutBtn = {
    backgroundColor: '#1e293b',
    border: 'none',
    color: '#94a3b8',
    padding: '0.6rem 1.25rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
};

const topGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
    marginBottom: '1.5rem'
};

const card = {
    backgroundColor: '#111827',
    border: '1px solid #1e293b',
    padding: '1.5rem',
    borderRadius: '4px'
};

const cardLabel = {
    fontSize: '0.7rem',
    color: '#64748b',
    fontWeight: 800,
    marginBottom: '0.5rem'
};

const cardValue = {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#f8fafc'
};

const cardSub = {
    fontSize: '0.8rem',
    color: '#475569',
    fontWeight: 400
};

const mainLayout = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem'
};

const panel = {
    backgroundColor: '#111827',
    border: '1px solid #1e293b',
    padding: '1.5rem',
    borderRadius: '4px'
};

const panelTitle = {
    fontSize: '0.85rem',
    fontWeight: 800,
    color: '#94a3b8',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    borderBottom: '1px solid #1e293b',
    paddingBottom: '0.75rem'
};

const distList = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
};

const distItem = {};

const distHeader = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem'
};

const distName = {
    fontSize: '0.7rem',
    fontWeight: 700,
    color: '#cbd5e1'
};

const distValue = {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#10b981'
};

const progBarBg = {
    height: '4px',
    backgroundColor: '#1e293b',
    borderRadius: '2px'
};

const progBar = {
    height: '100%',
    backgroundColor: '#334155'
};

export default MonitoringDashboard;
