import React from 'react';
import './MentorsSection.css';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import img3230 from '../assets/IMG_3230.JPG';
import img3213 from '../assets/IMG_3213.JPG';
import img3206 from '../assets/IMG_3206.JPG';
import img3216 from '../assets/IMG_3216.JPG';

const MentorsSection = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();

    const mentors = [
        {
            name: 'Muxammadbobur Abdumutallimov ❄️',
            role: {
                uz: 'IT Frontend Mentor',
                en: 'IT Frontend Mentor'
            },
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            slug: 'muxammadbobur-abdumutallimov'
        },
        {
            name: 'Abdulqodir Maxmudov ❄️',
            role: {
                uz: 'IT Frontend Mentor',
                en: 'IT Frontend Mentor'
            },
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            slug: 'abdulqodir-maxmudov'
        },
        {
            name: 'Salohiddin Obidov ❄️',
            role: {
                uz: 'Ingliz tili (IELTS) ustozi',
                en: 'English (IELTS) Instructor'
            },
            image: img3206,
            slug: 'ielts-instruktori'
        },
        {
            name: 'Zokirjon Ahmadqulov ❄️',
            role: {
                uz: 'IT Savodxonlik ustozi',
                en: 'IT Literacy Instructor'
            },
            image: img3230,
            slug: 'datasite-ustozi'
        },
        {
            name: 'Ilyosbek Habibullayev ❄️',
            role: {
                uz: 'Full Stack Mentor',
                en: 'Full Stack Mentor'
            },
            image: img3213,
            slug: 'senior-mentor'
        },
        {
            name: 'Osimxon Rahimjanov ❄️',
            role: {
                uz: 'Koreys tili ustozi',
                en: 'Korean Language Teacher'
            },
            image: img3216,
            slug: 'koreys-mutaxassisi'
        }
    ];

    return (
        <section className="mentors-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="title-text">{t.home.features.mentors}</h2>
                    <div className="accent-bar"></div>
                </div>
                <div className="mentors-grid">
                    {mentors.map((mentor, index) => (
                        <div
                            key={index}
                            className="mentor-card"
                            onClick={() => navigate(`/instructor/${mentor.slug}`)}
                        >
                            <div className="mentor-image-wrap">
                                <img src={mentor.image} alt={mentor.name} className="mentor-image" />
                                <div className="mentor-overlay"></div>
                                <div className="mentor-badge">Mentor</div>
                                <div className="mentor-info">
                                    <h3 className="mentor-name">{mentor.name}</h3>
                                    <p className="mentor-role">{mentor.role[language]}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MentorsSection;
