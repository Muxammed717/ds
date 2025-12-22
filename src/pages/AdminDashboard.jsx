import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { mockStudents as initialStudents } from '../data/students';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ id: '', name: '', course: '', status: 'paid', nextPayment: '' });

    useEffect(() => {
        // Check session validity
        const session = localStorage.getItem('adminSession');

        if (!session) {
            navigate('/admin');
            return;
        }

        try {
            const { authenticated, expiry } = JSON.parse(session);

            // Check if session expired
            if (!authenticated || Date.now() > expiry) {
                localStorage.removeItem('adminSession');
                navigate('/admin');
                return;
            }
        } catch (error) {
            // Invalid session data
            localStorage.removeItem('adminSession');
            navigate('/admin');
            return;
        }

        // Load data from localStorage or fallback to initialStudents
        const storedStudents = localStorage.getItem('datasite_students');
        if (storedStudents) {
            setStudents(JSON.parse(storedStudents));
        } else {
            setStudents(initialStudents);
            localStorage.setItem('datasite_students', JSON.stringify(initialStudents));
        }
    }, [navigate]);

    const saveToStorage = (updatedStudents) => {
        setStudents(updatedStudents);
        localStorage.setItem('datasite_students', JSON.stringify(updatedStudents));
    };

    const handleLogout = () => {
        localStorage.removeItem('adminSession');
        navigate('/admin');
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const updated = [...students, formData];
        saveToStorage(updated);
        setIsAdding(false);
        setFormData({ id: '', name: '', course: '', status: 'paid', nextPayment: '' });
    };

    const handleDelete = (id) => {
        if (window.confirm('Ishonchingiz komilmi?')) {
            const updated = students.filter(s => s.id !== id);
            saveToStorage(updated);
        }
    };

    const startEdit = (student) => {
        setEditingId(student.id);
        setFormData(student);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const updated = students.map(s => s.id === editingId ? formData : s);
        saveToStorage(updated);
        setEditingId(null);
        setFormData({ id: '', name: '', course: '', status: 'paid', nextPayment: '' });
    };

    return (
        <div className="page admin-dashboard" style={{ padding: '2rem 0' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <h1>{t.admin.dashboardTitle}</h1>
                    <button className="btn btn-outline" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaSignOutAlt /> Logout
                    </button>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    {!isAdding && editingId === null && (
                        <button className="btn btn-primary" onClick={() => setIsAdding(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaPlus /> {t.admin.addStudent}
                        </button>
                    )}
                </div>

                {(isAdding || editingId !== null) && (
                    <div style={{
                        backgroundColor: 'var(--bg-secondary)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: '3rem',
                        border: '1px solid var(--border)'
                    }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>{editingId ? t.admin.editStudent : t.admin.addStudent}</h2>
                        <form onSubmit={editingId ? handleUpdate : handleAdd} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <input
                                placeholder={t.admin.id}
                                value={formData.id}
                                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                disabled={editingId !== null}
                                required
                                className="input-field"
                                style={inputStyle}
                            />
                            <input
                                placeholder={t.admin.name}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                style={inputStyle}
                            />
                            <input
                                placeholder={t.admin.course}
                                value={formData.course}
                                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                required
                                style={inputStyle}
                            />
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                style={inputStyle}
                            >
                                <option value="paid">{t.admin.paid || 'Paid'}</option>
                                <option value="unpaid">{t.admin.unpaid || 'Unpaid'}</option>
                                <option value="pending">{t.admin.pending || 'Pending'}</option>
                            </select>
                            <input
                                type="date"
                                value={formData.nextPayment}
                                onChange={(e) => setFormData({ ...formData, nextPayment: e.target.value })}
                                required
                                style={inputStyle}
                            />
                            <div style={{ display: 'flex', gap: '1rem', gridColumn: '1 / -1' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{t.admin.saveBtn}</button>
                                <button type="button" className="btn btn-outline" onClick={() => { setIsAdding(false); setEditingId(null); }} style={{ flex: 1 }}>{t.admin.cancelBtn}</button>
                            </div>
                        </form>
                    </div>
                )}

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                        <thead>
                            <tr style={{ backgroundColor: 'var(--bg-secondary)', textAlign: 'left' }}>
                                <th style={thStyle}>{t.admin.id}</th>
                                <th style={thStyle}>{t.admin.name}</th>
                                <th style={thStyle}>{t.admin.course}</th>
                                <th style={thStyle}>{t.admin.status}</th>
                                <th style={thStyle}>{t.admin.nextPayment}</th>
                                <th style={thStyle}>{t.admin.actions}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={tdStyle}>{student.id}</td>
                                    <td style={tdStyle}>{student.name}</td>
                                    <td style={tdStyle}>{student.course}</td>
                                    <td style={tdStyle}>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            backgroundColor: student.status === 'paid' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: student.status === 'paid' ? '#10B981' : '#EF4444'
                                        }}>
                                            {student.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>{student.nextPayment}</td>
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => startEdit(student)} style={actionBtnStyle} title={t.admin.editStudent}><FaEdit /></button>
                                            <button onClick={() => handleDelete(student.id)} style={{ ...actionBtnStyle, color: '#EF4444' }} title={t.admin.deleteStudent}><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-main)',
    color: 'var(--text-main)',
    outline: 'none'
};

const thStyle = { padding: '1rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-secondary)' };
const tdStyle = { padding: '1rem', fontSize: '0.875rem' };
const actionBtnStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--primary)',
    fontSize: '1.1rem',
    padding: '0.25rem'
};

export default AdminDashboard;
