import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';
import { coursesData } from '../data/courses';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        course: coursesData[0]?.title || '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState({ show: false, type: 'success', message: '' });

    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);


    const formatPhoneNumber = (value) => {
        if (!value) return value;

        // Remove all non-digits
        const phoneNumber = value.replace(/\D/g, '');

        // If it starts with 998, keep only the digits after that, otherwise keep and add 998
        let numbers = '';
        if (phoneNumber.startsWith('998')) {
            numbers = phoneNumber.slice(3);
        } else {
            numbers = phoneNumber;
        }

        // Limit to 9 digits (Uzbekistan number length after 998)
        numbers = numbers.slice(0, 9);

        // Build the formatted string
        let formatted = '+998';
        if (numbers.length > 0) {
            formatted += ' (' + numbers.slice(0, 2);
        }
        if (numbers.length > 2) {
            formatted += ') ' + numbers.slice(2, 5);
        }
        if (numbers.length > 5) {
            formatted += '-' + numbers.slice(5, 7);
        }
        if (numbers.length > 7) {
            formatted += '-' + numbers.slice(7, 9);
        }

        return formatted;
    };

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'phone') {
            // If user tries to delete the +998, we handle it
            if (value.length < 4 && formData.phone.startsWith('+998')) {
                value = '';
            } else {
                value = formatPhoneNumber(value);
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const sendTelegramMessage = async (message) => {
        const botToken = '8448025655:AAFe_51EXWMPLpS388c1daw5Fhj7NThH_6k';
        const chatId = '6483456664';

        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            return await response.json();
        } catch (err) {
            console.error('Error sending message:', err);
            throw err;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submissionData = {
            ...formData
        };

        // Format message for Telegram
        const telegramMessage = `
<b>Yangi xabar!</b>
<b>Ism:</b> ${submissionData.name}
<b>Telefon:</b> ${submissionData.phone}
<b>Kurs:</b> ${submissionData.course}
<b>Xabar:</b> ${submissionData.message}
        `;

        try {
            // Send to Telegram
            await sendTelegramMessage(telegramMessage);

            // Console log for debugging
            console.log('Form submitted and Telegram message sent:', submissionData);

            setNotification({
                show: true,
                type: 'success',
                message: 'Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.'
            });
            setFormData({ name: '', phone: '', course: coursesData[0]?.title || '', message: '' });
        } catch (error) {
            setNotification({
                show: true,
                type: 'error',
                message: 'Xabar yuborishda xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.'
            });
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '2rem',
            fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: 'relative'
        }}>
            {/* Custom Notification Toast */}
            {notification.show && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 1000,
                    padding: '1rem 1.5rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: notification.type === 'success' ? '#10b981' : '#ef4444',
                    color: 'white',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    animation: 'slideIn 0.3s ease-out forwards',
                    maxWidth: '400px'
                }}>
                    {notification.type === 'success' ? <FaCheckCircle size={20} /> : <FaExclamationCircle size={20} />}
                    <span style={{ fontWeight: '500' }}>{notification.message}</span>
                    <button
                        onClick={() => setNotification(prev => ({ ...prev, show: false }))}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: 'auto',
                            padding: '4px',
                            opacity: 0.8
                        }}
                    >
                        <FaTimes size={16} />
                    </button>
                    <style>{`
                        @keyframes slideIn {
                            from { transform: translateX(100%); opacity: 0; }
                            to { transform: translateX(0); opacity: 1; }
                        }
                    `}</style>
                </div>
            )}

            <h1 style={{
                fontSize: '2.25rem',
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'var(--primary)',
                marginBottom: '2rem'
            }}>
                Biz bilan bog'laning
            </h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 1fr',
                gap: '2rem',
                backgroundColor: 'var(--bg-secondary)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)'
            }}>
                {/* Contact Information */}
                <div>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'var(--primary)',
                        marginBottom: '1.5rem'
                    }}>
                        Biz bilan aloqa
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{
                                backgroundColor: 'var(--accent)',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-full)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <FaPhone style={{ color: 'var(--primary)', fontSize: '1.25rem' }} />
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: '1.125rem',
                                    fontWeight: '500',
                                    margin: '0 0 0.5rem 0',
                                    color: 'var(--text-main)'
                                }}>Telefon</h3>
                                <p style={{
                                    margin: 0,
                                    color: 'var(--text-secondary)'
                                }}>+998-95-061-64-66</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{
                                backgroundColor: 'var(--accent)',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-full)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <FaEnvelope style={{ color: 'var(--primary)', fontSize: '1.25rem' }} />
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: '1.125rem',
                                    fontWeight: '500',
                                    margin: '0 0 0.5rem 0',
                                    color: 'var(--text-main)'
                                }}>Email</h3>
                                <p style={{
                                    margin: 0,
                                    color: 'var(--text-secondary)'
                                }}>datasite_academy@gmail.com</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{
                                backgroundColor: 'var(--accent)',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-full)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <FaMapMarkerAlt style={{ color: 'var(--primary)', fontSize: '1.25rem' }} />
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: '1.125rem',
                                    fontWeight: '500',
                                    margin: '0 0 0.5rem 0',
                                    color: 'var(--text-main)'
                                }}>Manzil</h3>
                                <p style={{
                                    margin: 0,
                                    color: 'var(--text-secondary)'
                                }}>📍 Manzil: A.Xodjayev 38</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'var(--primary)',
                        marginBottom: '1.5rem'
                    }}>
                        Xabar yuborish
                    </h2>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: 'var(--text-main)',
                                fontWeight: '500'
                            }}>
                                Ismingiz
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    backgroundColor: 'var(--bg-main)',
                                    color: 'var(--text-main)'
                                }}
                                placeholder="Ismingizni kiriting"
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: 'var(--text-main)',
                                fontWeight: '500'
                            }}>
                                Telefon raqamingiz
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    backgroundColor: 'var(--bg-main)',
                                    color: 'var(--text-main)'
                                }}
                                placeholder="+998 (90) 123-45-67"
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: 'var(--text-main)',
                                fontWeight: '500'
                            }}>
                                Kursni tanlang
                            </label>
                            <select
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    backgroundColor: 'var(--bg-main)',
                                    color: 'var(--text-main)',
                                    cursor: 'pointer'
                                }}
                            >
                                {coursesData.map((course) => (
                                    <option key={course.id} value={course.title}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: 'var(--text-main)',
                                fontWeight: '500'
                            }}>
                                Xabaringiz
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    resize: 'vertical',
                                    minHeight: '100px',
                                    transition: 'border-color 0.2s',
                                    backgroundColor: 'var(--bg-main)',
                                    color: 'var(--text-main)'
                                }}
                                placeholder="Xabaringizni yozing..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                width: '100%',
                                backgroundColor: isSubmitting ? 'var(--text-light)' : 'var(--primary)',
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.2s ease',
                                border: 'none',
                                boxShadow: 'var(--shadow-md)'
                            }}
                            onMouseEnter={(e) => {
                                if (!isSubmitting) {
                                    e.target.style.backgroundColor = 'var(--primary-dark)';
                                    e.target.style.transform = 'translateY(-1px)';
                                    e.target.style.boxShadow = 'var(--shadow-lg)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isSubmitting) {
                                    e.target.style.backgroundColor = 'var(--primary)';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'var(--shadow-md)';
                                }
                            }}
                        >
                            {isSubmitting ? (
                                'Yuborilmoqda...'
                            ) : (
                                <>
                                    <FaPaperPlane /> Xabarni yuborish
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;