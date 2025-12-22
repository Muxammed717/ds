import React, { useState } from 'react';
import { FaClock, FaStar, FaAward, FaExternalLinkAlt } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { coursesData } from '../data/courses';

const FilterButton = ({ active, children, onClick }) => (
    <button
        onClick={onClick}
        style={{
            padding: '0.6rem 1.8rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: active ? 'var(--primary)' : 'var(--bg-secondary)',
            color: active ? 'white' : 'var(--text-secondary)',
            fontWeight: 600,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: active ? '1px solid var(--primary)' : '1px solid var(--border)',
            fontSize: '0.9rem',
            boxShadow: active ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none',
            cursor: 'pointer'
        }}
    >
        {children}
    </button>
);

const Courses = () => {
    const { t } = useLanguage();
    const [filter, setFilter] = useState('All');

    const filteredCourses = filter === 'All'
        ? coursesData
        : coursesData.filter(course => course.category === filter);

    const categories = [
        { key: 'All', label: t.courses.filter.all },
        { key: 'Development', label: t.courses.filter.dev },
        { key: 'Data Science', label: t.courses.filter.data },
        { key: 'Design', label: t.courses.filter.design },
        { key: 'Marketing', label: t.courses.filter.marketing }
    ];

    return (
        <div className="page courses-page" style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', padding: '4rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ marginBottom: '1.25rem', fontSize: '3rem', fontWeight: 800, background: 'linear-gradient(to right, var(--primary), #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.courses.title}</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>{t.courses.subtitle}</p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem', flexWrap: 'wrap' }}>
                        {categories.map(cat => (
                            <FilterButton
                                key={cat.key}
                                active={filter === cat.key}
                                onClick={() => setFilter(cat.key)}
                            >
                                {cat.label}
                            </FilterButton>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
                    {filteredCourses.map(course => (
                        <div key={course.id} className="course-card-enhanced" style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderRadius: '1.5rem',
                            overflow: 'hidden',
                            border: '1px solid var(--border)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                                e.currentTarget.style.borderColor = 'var(--primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = 'var(--border)';
                            }}
                        >
                            {/* Course Image */}
                            <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                                <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>
                                    {course.category}
                                </div>
                            </div>

                            <div style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', color: '#FBBF24', fontSize: '0.9rem' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} style={{ color: i < Math.floor(course.rating) ? '#FBBF24' : 'var(--border)' }} />
                                        ))}
                                    </div>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{course.rating}</span>
                                </div>

                                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.3, color: 'var(--text-main)' }}>{course.title}</h3>

                                {/* Teacher Info */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    backgroundColor: 'var(--bg-main)',
                                    borderRadius: '1rem',
                                    marginBottom: '1.5rem',
                                    border: '1px solid var(--border)'
                                }}>
                                    <img src={course.instructorImg} alt={course.instructor} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }} />
                                    <div>
                                        <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{course.instructor}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <FaAward style={{ color: 'var(--primary)' }} /> {course.instructorExp} {t.courses.years} {t.courses.experience}
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                            <FaClock /> {course.duration}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>{course.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses;
