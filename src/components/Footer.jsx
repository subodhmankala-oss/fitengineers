import React from 'react';
import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-logo">
                    FIT<span className="text-highlight">ENGINEERSS</span>
                </div>
                <div className="social-links">
                    <a target="_blank" href="https://www.instagram.com/lilswaaggg/" className="social-icon"><Instagram /></a>
                    <a target="_blank" href="https://www.facebook.com/mankala.subodh" className="social-icon"><Facebook /></a>
                    <a target="_blank" href="https://youtube.com/@subodhmankala?si=s4iKxS1jttcag8-4" className="social-icon"><Youtube /></a>
                    <a target="_blank" href="https://www.linkedin.com/in/subodh-mankala-65800272/" className="social-icon"><Linkedin /></a>
                </div>
                <p className="copyright">
                    &copy; {new Date().getFullYear()} FitEngineerss. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
