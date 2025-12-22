import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you, ${formData.name}! We will get back to you soon.`);
        setFormData({ name: '', email: '', message: '' });
    };

    const inputStyle = {
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        fontSize: '1rem',
        fontFamily: 'inherit',
        width: '100%',
        transition: 'border-color 0.2s'
    };

    return (
        <div className="page contact-page">
            <div className="container section">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t.contact.title}</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{t.contact.subtitle}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
                    {/* Contact Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)' }}>
                                <FaPhone size={20} />
                            </div>
                            <div>
                                <h3 style={{ marginBottom: '0.5rem' }}>{t.contact.labels.phone}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>+1 (555) 123-4567</p>
                                <p style={{ color: 'var(--text-secondary)' }}>Mon-Fri 9am-6pm</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)' }}>
                                <FaEnvelope size={20} />
                            </div>
                            <div>
                                <h3 style={{ marginBottom: '0.5rem' }}>{t.contact.labels.email}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>info@datasite.academy</p>
                                <p style={{ color: 'var(--text-secondary)' }}>support@datasite.academy</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)' }}>
                                <FaMapMarkerAlt size={20} />
                            </div>
                            <div>
                                <h3 style={{ marginBottom: '0.5rem' }}>{t.contact.labels.office}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>123 Education Lane</p>
                                <p style={{ color: 'var(--text-secondary)' }}>Silicon Valley, CA 94025</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'var(--bg-main)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>{t.contact.labels.name}</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>{t.contact.labels.emailAddr}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>{t.contact.labels.message}</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                placeholder="How can we help you?"
                                required
                                style={{ ...inputStyle, resize: 'vertical' }}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>{t.contact.labels.send}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
