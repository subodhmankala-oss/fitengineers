import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-logo">
                    FIT<span className="text-highlight">ENGINEERSS</span>
                </div>
                <div className="social-links">
                    <a href="#" className="social-icon"><Instagram /></a>
                    <a href="#" className="social-icon"><Twitter /></a>
                    <a href="#" className="social-icon"><Facebook /></a>
                </div>
                <p className="copyright">
                    &copy; {new Date().getFullYear()} FitEngineerss. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
