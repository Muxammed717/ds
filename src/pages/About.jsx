import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaRocket, FaLightbulb, FaHandshake, FaGraduationCap } from 'react-icons/fa';
import './About.css';

const StatCounter = ({ targetValue, duration = 2000, label = '' }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const elementRef = useRef(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (elementRef.current) observer.observe(elementRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime = null;
        const end = parseInt(targetValue, 10);

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            const easeOutQuad = 1 - (1 - progress) * (1 - progress);
            setDisplayValue(Math.floor(easeOutQuad * end));

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(end);
            }
        };

        requestAnimationFrame(animate);
    }, [hasStarted, targetValue, duration]);

    return (
        <div className="stat-unit" ref={elementRef}>
            <span className="stat-number">{displayValue}+</span>
            <p className="stat-label">{label}</p>
        </div>
    );
};

const About = () => {
    const { t } = useLanguage();

    useEffect(() => {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.on-scroll-reveal').forEach(el => revealObserver.observe(el));
        return () => revealObserver.disconnect();
    }, []);

    const JOURNEY_MILESTONES = [
        { year: '2022', title: t.aboutPage.timeline.year2022.split(':')[1], desc: t.aboutPage.timeline.desc2022, side: 'left' },
        { year: '2023', title: t.aboutPage.timeline.year2023.split(':')[1], desc: t.aboutPage.timeline.desc2023, side: 'right' },
        { year: '2024', title: t.aboutPage.timeline.year2024.split(':')[1], desc: t.aboutPage.timeline.desc2024, side: 'left' },
        { year: '2025', title: t.aboutPage.timeline.year2025.split(':')[1], desc: t.aboutPage.timeline.desc2025, side: 'right' }
    ];

    return (
        <div className="academy-about">
            <section className="about-banner on-scroll-reveal slide-up">
                <div className="banner-content">
                    <h1 className="main-heading animate-delay-1">{t.aboutPage.heroTitle}</h1>
                    <p className="sub-heading animate-delay-2">{t.aboutPage.heroSubtitle}</p>
                </div>
            </section>

            <section className="vision-module">
                <div className="container">
                    <div className="vision-card on-scroll-reveal slide-up">
                        <div className="icon-pulse">
                            <FaRocket />
                        </div>
                        <h2>{t.aboutPage.missionTitle}</h2>
                        <p>{t.aboutPage.missionDesc}</p>
                    </div>
                </div>
            </section>

            <section className="journey-track">
                <div className="container">
                    <h2 className="section-header on-scroll-reveal fade-in">Bizning Tariximiz</h2>
                    <div className="timeline-wrapper">
                        {JOURNEY_MILESTONES.map((item, idx) => (
                            <div
                                key={idx}
                                className={`milestone-item on-scroll-reveal ${item.side === 'left' ? 'reveal-left' : 'reveal-right'}`}
                            >
                                <div className="milestone-marker"></div>
                                <div className="milestone-box">
                                    <span className="milestone-year">{item.year}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="impact-stats">
                <div className="container">
                    <div className="stats-dashboard">
                        <StatCounter targetValue="200" label={t.aboutPage.stats.students} />
                        <StatCounter targetValue="15" label={t.aboutPage.stats.courses} />
                        <StatCounter targetValue="50" label={t.aboutPage.stats.mentors} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
