import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTelegram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t, language } = useLanguage();

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-col brand-col">
                    <h3 className="footer-logo">Datasite<span>Academy</span></h3>
                    <p className="footer-text">
                        {t.footer.desc}
                    </p>
                    <div className="footer-social-wrapper">
                        <a href={t.footer.socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="social-icon-box"><FaTelegram /></a>
                        <a href={t.footer.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon-box"><FaInstagram /></a>
                        <a href={t.footer.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="social-icon-box"><FaYoutube /></a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4 className="footer-heading">{t.footer.quickLinks}</h4>
                    <ul className="footer-links">
                        <li><a href="/">{t.nav.home}</a></li>
                        <li><a href="/courses">{t.nav.courses}</a></li>
                        <li><a href="/about">{t.nav.about}</a></li>
                        <li><a href="/status">{t.nav.status}</a></li>
                        <li><a href="/contact">{t.nav.contact}</a></li>
                    </ul>
                </div>
                
                <div className="footer-col contact-col">
                    <h4 className="footer-heading">{t.footer.contactInfo}</h4>
                    <ul className="footer-contact-list">
                        <li>
                            <FaPhone className="contact-icon" />
                            <span>{t.footer.phone}</span>
                        </li>
                        <li>
                            <FaEnvelope className="contact-icon" />
                            <span>{t.footer.email}</span>
                        </li>
                        <li>
                            <FaMapMarkerAlt className="contact-icon" />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>{t.footer.address}</span>
                                <span>{t.footer.landmark}</span>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="footer-col newsletter-col">
                    <h4 className="footer-heading">{t.footer.newsletter.title}</h4>
                    <p className="footer-text">{t.footer.newsletter.desc}</p>
                    <div className="footer-newsletter">
                        <input type="email" placeholder={t.footer.newsletter.placeholder} />
                        <button type="button">{t.footer.newsletter.btn}</button>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container footer-bottom-content">
                    <p>&copy; {new Date().getFullYear()} Datasite Academy. {t.footer.rights}</p>
                    <div className="footer-bottom-links">
                        <a href="#">{t.footer.legal.privacy}</a>
                        <a href="#">{t.footer.legal.terms}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
