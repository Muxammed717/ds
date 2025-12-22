import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-col">
                    <h3 className="footer-logo">DatasiteAcademy</h3>
                    <p className="footer-text">
                        {t.footer.desc}
                    </p>
                </div>
                <div className="footer-col">
                    <h4>{t.footer.quickLinks}</h4>
                    <ul>
                        <li><a href="/">{t.nav.home}</a></li>
                        <li><a href="/courses">{t.nav.courses}</a></li>
                        <li><a href="/about">{t.nav.about}</a></li>
                        <li><a href="/contact">{t.nav.contact}</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>{t.footer.socials}</h4>
                    <div className="social-icons">
                        <FaFacebook />
                        <FaTwitter />
                        <FaInstagram />
                        <FaLinkedin />
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Datasite Academy. {t.footer.rights}</p>
            </div>
        </footer>
    );
};

export default Footer;
