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
    const [formData, setFormData] = useState({ id: '', name: '', course: '', status: 'paid', lastPayment: '', nextPayment: '', totalPaid: 0 });
    const [paymentModal, setPaymentModal] = useState({ show: false, id: null, amount: '500000', studentName: '' });

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

    const sendTelegramNotification = async (title, data) => {
        try {
            const message = `${title}\n\nID: ${data.id}\nIsm: ${data.name}\nKurs: ${data.course}\nStatus: ${data.status}\nOxirgi To'lov: ${data.lastPayment}\nKeyingi To'lov: ${data.nextPayment}`;

            const response = await fetch(`https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: import.meta.env.VITE_TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            if (!response.ok) {
                console.error('Telegram notification failed');
            }
        } catch (error) {
            console.error('Error sending Telegram notification:', error);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const updated = [...students, formData];
        saveToStorage(updated);
        setIsAdding(false);
        setFormData({ id: '', name: '', course: '', status: 'paid', lastPayment: '', nextPayment: '' });

        // Send Telegram notification
        await sendTelegramNotification('Yangi o\'quvchi qo\'shildi:', formData);
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
        setFormData({ id: '', name: '', course: '', status: 'paid', lastPayment: '', nextPayment: '', totalPaid: 0 });
    };

    const handleMarkPaid = (id, name) => {
        setPaymentModal({ show: true, id: id, amount: '500000', studentName: name });
    };

    const confirmPayment = () => {
        const amount = parseInt(paymentModal.amount.toString().replace(/\D/g, '')) || 0;
        const today = new Date().toISOString().split('T')[0];
        const nextMonth = new Date();
        nextMonth.setDate(nextMonth.getDate() + 30);
        const nextPaymentDate = nextMonth.toISOString().split('T')[0];

        const updated = students.map(s => {
            if (s.id === paymentModal.id) {
                return {
                    ...s,
                    status: 'paid',
                    lastPayment: today,
                    nextPayment: nextPaymentDate,
                    totalPaid: (s.totalPaid || 0) + amount
                };
            }
            return s;
        });
        saveToStorage(updated);
        setPaymentModal({ show: false, id: null, amount: '500000', studentName: '' });

        // Notification
        const student = students.find(s => s.id === paymentModal.id);
        sendTelegramNotification('To\'lov qabul qilindi:', { ...student, status: 'paid', lastPayment: today, nextPayment: nextPaymentDate });
    };

    const handleMarkUnpaid = (id) => {
        const updated = students.map(s => s.id === id ? { ...s, status: 'unpaid' } : s);
        saveToStorage(updated);
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
                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t.admin.lastPayment}</label>
                                <input
                                    type="date"
                                    value={formData.lastPayment}
                                    onChange={(e) => {
                                        const date = e.target.value;
                                        const nextDate = new Date(date);
                                        nextDate.setDate(nextDate.getDate() + 30);
                                        const formattedNext = nextDate.toISOString().split('T')[0];
                                        setFormData({ ...formData, lastPayment: date, nextPayment: formattedNext });
                                    }}
                                    style={{ ...inputStyle, width: '100%' }}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t.admin.nextPayment}</label>
                                <input
                                    type="date"
                                    value={formData.nextPayment}
                                    onChange={(e) => setFormData({ ...formData, nextPayment: e.target.value })}
                                    required
                                    style={{ ...inputStyle, width: '100%' }}
                                />
                            </div>
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
                                <th style={thStyle}>{t.admin.lastPayment}</th>
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
                                    <td style={tdStyle}>{student.lastPayment}</td>
                                    <td style={tdStyle}>{student.nextPayment}</td>
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            <button
                                                onClick={() => handleMarkPaid(student.id, student.name)}
                                                style={{ ...actionBtnStyle, padding: '0.4rem 0.8rem', backgroundColor: '#10B981', color: 'white', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}
                                            >
                                                {t.admin.markPaid}
                                            </button>
                                            <button
                                                onClick={() => handleMarkUnpaid(student.id)}
                                                style={{ ...actionBtnStyle, padding: '0.4rem 0.8rem', backgroundColor: '#EF4444', color: 'white', borderRadius: '0.5rem', fontSize: '0.75rem' }}
                                            >
                                                {t.admin.markUnpaid}
                                            </button>
                                            <button onClick={() => startEdit(student)} style={{ ...actionBtnStyle, color: 'var(--text-secondary)' }} title={t.admin.editStudent}><FaEdit /></button>
                                            <button onClick={() => handleDelete(student.id)} style={{ ...actionBtnStyle, color: '#EF4444' }} title={t.admin.deleteStudent}><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Custom Payment Modal */}
                {paymentModal.show && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '1rem'
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '1.5rem',
                            padding: '2.5rem',
                            width: '100%',
                            maxWidth: '450px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            animation: 'modalSlideUp 0.3s cubic-bezier(0.19, 1, 0.22, 1)'
                        }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#15322C', marginBottom: '0.5rem' }}>To'lovni qabul qilish</h3>
                            <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1rem' }}>
                                <span style={{ fontWeight: 700, color: '#15322C' }}>{paymentModal.studentName}</span> uchun to'lov summasini kiriting:
                            </p>

                            <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
                                <input
                                    type="text"
                                    autoFocus
                                    value={new Intl.NumberFormat('uz-UZ').format(paymentModal.amount)}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '');
                                        setPaymentModal({ ...paymentModal, amount: val });
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '1.25rem',
                                        fontSize: '1.75rem',
                                        fontWeight: 800,
                                        textAlign: 'center',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '1rem',
                                        color: '#10b981',
                                        backgroundColor: '#f8fafc',
                                        outline: 'none',
                                        WebkitAppearance: 'none'
                                    }}
                                />
                                <span style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#94a3b8' }}>UZS</span>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => setPaymentModal({ ...paymentModal, show: false })}
                                    style={{ flex: 1, padding: '1rem', borderRadius: '0.75rem', fontWeight: 700, cursor: 'pointer', border: '1px solid #e2e8f0', backgroundColor: 'transparent', color: '#64748b' }}
                                >
                                    Bekor qilish
                                </button>
                                <button
                                    onClick={confirmPayment}
                                    style={{ flex: 1, padding: '1rem', borderRadius: '0.75rem', fontWeight: 700, cursor: 'pointer', border: 'none', backgroundColor: '#10b981', color: 'white', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}
                                >
                                    Tasdiqlash
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <style>{`
                    @keyframes modalSlideUp {
                        from { opacity: 0; transform: translateY(20px) scale(0.95); }
                        to { opacity: 1; transform: translateY(0) scale(1); }
                    }
                `}</style>
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
