import React, { useEffect, useState } from 'react';
import { FaLaptopCode, FaChartLine, FaUserTie, FaRocket, FaProjectDiagram, FaBriefcase, FaGraduationCap, FaPalette } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Home.css';

const RoadmapStep = ({ icon: Icon, title, desc, stepNumber }) => (
    <div className="roadmap-card">
        <div className="step-count">{stepNumber}</div>
        <div className="icon-wrap">
            <Icon />
        </div>
        <div className="card-info">
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    </div>
);

const MainBanner = ({ t }) => {
    const [activePhrase, setActivePhrase] = useState(0);
    const phrases = t.home.hero.keywords;

    useEffect(() => {
        const interval = setInterval(() => {
            setActivePhrase((prev) => (prev + 1) % phrases.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [phrases.length]);

    return (
        <section className="banner-wrap">
            <div className="background-elements">
                <div className="glow-orb orb-1"></div>
                <div className="glow-orb orb-2"></div>
                <div className="glow-orb orb-3"></div>
            </div>
            <div className="container banner-inner">
                <h1 className="banner-heading">
                    <span className="lead-text">{t.home.hero.titlePrefix}</span>
                    <div className="phrase-slider">
                        {phrases.map((phrase, idx) => (
                            <span
                                key={idx}
                                className={`phrase-item ${idx === activePhrase ? 'is-visible' : ''}`}
                            >
                                {phrase}
                            </span>
                        ))}
                    </div>
                    <span className="lead-text">{t.home.hero.titleSuffix}</span>
                </h1>
                <p className="banner-subtext">{t.home.hero.subtitle}</p>
                <div className="banner-btns">
                    <Link to="/courses" className="btn btn-primary btn-banner">{t.home.hero.cta}</Link>
                    <Link to="/about" className="btn btn-outline btn-banner">{t.home.hero.secondaryCta}</Link>
                </div>
            </div>
        </section>
    );
};

const Home = () => {
    const { t } = useLanguage();

    const ROADMAP_STEPS = [
        { icon: FaRocket, title: t.home.path.step1, desc: t.home.path.step1Desc },
        { icon: FaProjectDiagram, title: t.home.path.step2, desc: t.home.path.step2Desc },
        { icon: FaBriefcase, title: t.home.path.step3, desc: t.home.path.step3Desc },
        { icon: FaGraduationCap, title: t.home.path.step4, desc: t.home.path.step4Desc }
    ];

    return (
        <div className="home-layout">
            <MainBanner t={t} />

            <section className="academy-roadmap">
                <div className="container">
                    <div className="roadmap-header">
                        <h2 className="title-text">{t.home.path.title}</h2>
                        <div className="accent-bar"></div>
                    </div>

                    <div className="roadmap-grid">
                        {ROADMAP_STEPS.map((step, idx) => (
                            <RoadmapStep
                                key={idx}
                                icon={step.icon}
                                title={step.title}
                                desc={step.desc}
                                stepNumber={idx + 1}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="academy-highlights">
                <div className="container">
                    <div className="highlights-header">
                        <h2 className="title-text">{t.home.whyTitle}</h2>
                        <div className="accent-bar"></div>
                        <p className="subtitle-text">
                            {t.home.whySubtitle}
                        </p>
                    </div>

                    <div className="highlights-grid">
                        <div className="highlight-card item-support">
                            <div className="card-symbol" style={{ backgroundColor: '#f0932b' }}><FaUserTie /></div>
                            <h3>{t.home.features.secondTeacher}</h3>
                            <p>{t.home.features.secondTeacherDesc}</p>
                        </div>

                        <div className="highlight-card item-mentors">
                            <div className="mentors-preview">
                                <img src="/src/assets/team_mentors.jpg" alt="Academy Mentors" />
                            </div>
                            <h3>{t.home.features.mentors}</h3>
                            <p>{t.home.features.mentorsDesc}</p>
                        </div>

                        <div className="highlight-card item-events">
                            <div className="card-symbol" style={{ backgroundColor: '#eb4d4b' }}><FaPalette /></div>
                            <h3>{t.home.features.events}</h3>
                            <p>{t.home.features.eventsDesc}</p>
                        </div>

                        <div className="highlight-card item-mock">
                            <div className="card-symbol" style={{ backgroundColor: '#6ab04c' }}><FaLaptopCode /></div>
                            <h3>{t.home.features.mock}</h3>
                            <p>{t.home.features.mockDesc}</p>
                        </div>

                        <div className="highlight-card item-coworking">
                            <div className="card-symbol" style={{ backgroundColor: '#30336b' }}><FaChartLine /></div>
                            <h3>{t.home.features.coworking}</h3>
                            <p>{t.home.features.coworkingDesc}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
