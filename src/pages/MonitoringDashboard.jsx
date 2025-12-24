import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { mockStudents as initialStudents } from '../data/students';
import { coursesData } from '../data/courses';
import {
    FaUsers, FaMoneyBillWave, FaBookOpen, FaChartPie,
    FaSignOutAlt, FaShieldAlt, FaServer,
    FaChartLine, FaTerminal, FaDatabase, FaNetworkWired
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
        courseDistribution: {}
    });

    const [uptime, setUptime] = useState('00:00:00');
    const [logs, setLogs] = useState([]);
    const logContainerRef = useRef(null);

    useEffect(() => {
        const session = localStorage.getItem('monitorSession');
        if (!session) { navigate('/monitoring'); return; }

        const storedStudents = localStorage.getItem('datasite_students');
        const students = storedStudents ? JSON.parse(storedStudents) : initialStudents;
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
            courseDistribution: dist
        });

        const startTime = Date.now();
        const interval = setInterval(() => {
            const diff = Date.now() - startTime;
            const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
            const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
            const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
            setUptime(`${h}:${m}:${s}`);

            const actions = ['FETCH_STUDENTS', 'VALIDATE_AUTH', 'SYNC_DB', 'CACHE_RELOAD', 'NODE_PING', 'REVENUE_CALC'];
            const newLog = `[${new Date().toLocaleTimeString()}] ${actions[Math.floor(Math.random() * actions.length)]} - SUCCESS`;
            setLogs(prev => [...prev.slice(-20), newLog]);
        }, 3000);

        return () => clearInterval(interval);
    }, [navigate]);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="monitoring-page" style={pageStyle}>
            <div className="container" style={{ maxWidth: '1440px' }}>
                {/* Minimalist Top Bar */}
                <header style={headerStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={statusInd}></div>
                        <h1 style={titleStyle}>SYSTEM MONITORING CENTER</h1>
                        <span style={verStyle}>v4.1.0</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={timeDisplay}>
                            <span style={timeLabel}>SYSTEM UPTIME</span>
                            <span style={timeValue}>{uptime}</span>
                        </div>
                        <button style={logoutBtn} onClick={() => { localStorage.removeItem('monitorSession'); navigate('/monitoring'); }}>
                            <FaSignOutAlt /> EXIT
                        </button>
                    </div>
                </header>

                {/* Data Grid - 4 Columns */}
                <div style={topGrid}>
                    <QuickStat label="TOTAL CAPACITY" value={stats.totalStudents} sub="Students" />
                    <QuickStat label="OPERATIONAL REVENUE" value={new Intl.NumberFormat('uz-UZ').format(stats.totalRevenue)} sub="UZS" />
                    <QuickStat label="ACTIVE MODULES" value={stats.activeCourses} sub="Courses" />
                    <QuickStat label="PAYMENT RATIO" value={Math.round((stats.paidCount / stats.totalStudents) * 100) + '%'} sub="Verified" />
                </div>

                <div style={mainLayout}>
                    {/* Left: System Status & Distribution */}
                    <div style={leftColumn}>
                        <div style={panel}>
                            <h3 style={panelTitle}><FaDatabase /> DATA DISTRIBUTION</h3>
                            <div style={distList}>
                                {Object.entries(stats.courseDistribution).map(([course, count]) => (
                                    <div key={course} style={distItem}>
                                        <div style={distHeader}>
                                            <span style={distName}>{course.toUpperCase()}</span>
                                            <span style={distValue}>{count}</span>
                                        </div>
                                        <div style={progBarBg}>
                                            <div style={{ ...progBar, width: `${(count / stats.totalStudents) * 100}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={statusGrid}>
                            <StatusTile icon={<FaServer />} label="BASE SERVER" status="ONLINE" />
                            <StatusTile icon={<FaNetworkWired />} label="API GATEWAY" status="ACTIVE" />
                        </div>
                    </div>

                    {/* Right: Real-time Terminal Logs */}
                    <div style={rightColumn}>
                        <div style={terminalPanel}>
                            <h3 style={panelTitle}><FaTerminal /> SYSTEM REAL-TIME LOGS</h3>
                            <div ref={logContainerRef} style={logArea}>
                                {logs.map((log, i) => (
                                    <div key={i} style={logLine}>
                                        <span style={logArrow}></span> {log}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={summaryPanel}>
                            <div style={summaryStat}>
                                <div style={sumLabel}>SECURITY STATUS</div>
                                <div style={sumValue}>ENCRYPTED / AES-256</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
            `}</style>
        </div>
    );
};

// Sub-components
const QuickStat = ({ label, value, sub }) => (
    <div style={card}>
        <div style={cardLabel}>{label}</div>
        <div style={cardValue}>{value} <span style={cardSub}>{sub}</span></div>
    </div>
);

const StatusTile = ({ icon, label, status }) => (
    <div style={tile}>
        <div style={tileIcon}>{icon}</div>
        <div>
            <div style={tileLabel}>{label}</div>
            <div style={tileStatus}>{status}</div>
        </div>
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

const statusInd = {
    width: '10px',
    height: '10px',
    backgroundColor: '#10b981',
    borderRadius: '2px'
};

const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#f1f5f9',
    margin: 0
};

const verStyle = {
    fontSize: '0.7rem',
    color: '#475569',
    backgroundColor: '#1e293b',
    padding: '2px 6px',
    borderRadius: '3px'
};

const timeDisplay = {
    textAlign: 'right'
};

const timeLabel = {
    display: 'block',
    fontSize: '0.6rem',
    color: '#64748b',
    fontWeight: 700
};

const timeValue = {
    fontSize: '1.1rem',
    fontWeight: 600,
    fontFamily: 'monospace',
    color: '#10b981'
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

const leftColumn = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
};

const rightColumn = {
    display: 'flex',
    flexDirection: 'column',
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

const statusGrid = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
};

const tile = {
    backgroundColor: '#111827',
    border: '1px solid #1e293b',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    borderRadius: '4px'
};

const tileIcon = {
    color: '#475569',
    fontSize: '1.25rem'
};

const tileLabel = {
    fontSize: '0.6rem',
    fontWeight: 800,
    color: '#64748b'
};

const tileStatus = {
    fontSize: '0.9rem',
    fontWeight: 700,
    color: '#10b981'
};

const terminalPanel = {
    backgroundColor: '#000',
    border: '1px solid #1e293b',
    padding: '1.5rem',
    borderRadius: '4px',
    flex: 1
};

const logArea = {
    height: '320px',
    overflowY: 'auto',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.75rem',
    color: '#94a3b8',
    lineHeight: '1.6'
};

const logLine = {
    marginBottom: '4px'
};

const logArrow = {
    color: '#475569'
};

const summaryPanel = {
    backgroundColor: '#111827',
    border: '1px solid #1e293b',
    padding: '1.25rem',
    borderRadius: '4px'
};

const summaryStat = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const sumLabel = {
    fontSize: '0.7rem',
    fontWeight: 800,
    color: '#64748b'
};

const sumValue = {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#cbd5e1'
};

export default MonitoringDashboard;
