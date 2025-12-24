import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaAward, FaGraduationCap, FaCheckCircle, FaUserTie } from 'react-icons/fa';
import { coursesData } from '../data/courses';
import { useLanguage } from '../context/LanguageContext';

const InstructorDetails = () => {
    const { slug } = useParams();
    const { t, language } = useLanguage();
    const navigate = useNavigate();

    const instructorData = coursesData.find(c => c.instructorSlug === slug);

    if (!instructorData) {
        return (
            <div style={{ padding: '10rem 0', textAlign: 'center' }}>
                <h2>{language === 'uz' ? "O'qituvchi topilmadi" : "Instructor not found"}</h2>
                <Link to="/courses" className="btn btn-primary">{language === 'uz' ? "Kurslarga qaytish" : "Back to courses"}</Link>
            </div>
        );
    }

    const labels = {
        back: language === 'uz' ? 'Orqaga' : 'Back',
        students: language === 'uz' ? 'O\'quvchilar' : 'Students',
        education: language === 'uz' ? 'Ma\'lumoti' : 'Education',
        about: language === 'uz' ? 'Mentor haqida' : 'About Mentor',
        skills: language === 'uz' ? 'Ko\'nikmalar' : 'Skills',
        achievements: language === 'uz' ? 'Yutuqlar' : 'Achievements',
        courses: language === 'uz' ? 'O\'tadigan kurslari' : 'Courses taught'
    };

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
            <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '1rem 0', position: 'sticky', top: '80px', zIndex: 100 }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer' }}
                    >
                        <FaArrowLeft /> {labels.back}
                    </button>
                </div>
            </div>

            <div className="container" style={{ marginTop: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 992 ? 'minmax(300px, 400px) 1fr' : '1fr', gap: '3rem' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '2rem',
                            padding: '2.5rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                            textAlign: 'center',
                            border: '1px solid #e2e8f0'
                        }}>
                            <div style={{
                                width: '180px',
                                height: '180px',
                                borderRadius: '50%',
                                margin: '0 auto 1.5rem',
                                overflow: 'hidden',
                                border: '4px solid var(--primary)',
                                boxShadow: '0 8px 16px rgba(21, 50, 44, 0.15)'
                            }}>
                                <img
                                    src={instructorData.instructorImg || `https://ui-avatars.com/api/?name=${encodeURIComponent(instructorData.instructor)}&background=15322c&color=fff&bold=true&size=200`}
                                    alt={instructorData.instructor}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                                {instructorData.instructor}
                            </h1>                        </div>

                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '1.5rem',
                            padding: '2rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                            border: '1px solid #e2e8f0'
                        }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                                <FaGraduationCap style={{ color: 'var(--primary)' }} /> {labels.education}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                                {instructorData.instructorEdu[language]}
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <section style={{
                            backgroundColor: 'white',
                            borderRadius: '2rem',
                            padding: '3rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                            border: '1px solid #e2e8f0'
                        }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <FaUserTie style={{ color: 'var(--primary)' }} /> {labels.about}
                            </h2>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                                {instructorData.instructorBio[language]}
                            </p>
                        </section>

                        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 640 ? '1fr 1fr' : '1fr', gap: '2rem' }}>
                            <section style={{
                                backgroundColor: 'white',
                                borderRadius: '1.5rem',
                                padding: '2.5rem',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                border: '1px solid #e2e8f0'
                            }}>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaCheckCircle style={{ color: '#10b981' }} /> {labels.skills}
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                    {instructorData.instructorSkills[language].map((skill, idx) => (
                                        <span key={idx} style={{
                                            backgroundColor: '#f1f5f9',
                                            color: '#475569',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '2rem',
                                            fontSize: '0.85rem',
                                            fontWeight: 600
                                        }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>                            <section style={{
                                backgroundColor: 'white',
                                borderRadius: '1.5rem',
                                padding: '2.5rem',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                border: '1px solid #e2e8f0'
                            }}>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaAward style={{ color: '#f59e0b' }} /> {labels.achievements}
                                </h3>
                                <div style={{
                                    padding: '1rem',
                                    borderLeft: '4px solid #f59e0b',
                                    backgroundColor: '#fffbeb',
                                    borderRadius: '0 1rem 1rem 0'
                                }}>
                                    <p style={{ margin: 0, fontWeight: 700, color: '#92400e' }}>{instructorData.instructorAchieve[language]}</p>
                                </div>
                            </section>
                        </div>

                        <section style={{
                            backgroundColor: 'white',
                            borderRadius: '2rem',
                            padding: '2.5rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                            border: '1px solid #e2e8f0'
                        }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem' }}>{labels.courses}</h3>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                padding: '1.5rem',
                                borderRadius: '1.5rem',
                                border: '1px solid #f1f5f9',
                                textDecoration: 'none',
                                color: 'inherit'
                            }}>
                                <img src={instructorData.image} style={{ width: '120px', height: '80px', borderRadius: '1rem', objectFit: 'cover' }} alt={instructorData.title} />
                                <div>
                                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{instructorData.title}</h4>
                                    <p style={{ margin: 0, color: 'var(--primary)', fontWeight: 700 }}>{instructorData.price}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorDetails;
