import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation();

    useEffect(() => {
        // Update active link based on current path
        const path = location.pathname;
        if (path === '/') setActiveLink('home');
        else setActiveLink(path.substring(1));
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Navbar visibility logic
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);

            // Scroll Spy Logic
            const sections = ['home', 'about', 'services', 'programs', 'pricing', 'contact'];

            // Find the section that is currently active
            // We consider a section active if it crosses the middle of the viewport (or slightly above 3/4 center as requested)
            const scrollPosition = window.scrollY + (window.innerHeight / 2);

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        if (activeLink !== sectionId) {
                            setActiveLink(sectionId);
                            // Update URL without reloading or jumping
                            const newPath = sectionId === 'home' ? '/' : `/${sectionId}`;
                            if (location.pathname !== newPath) {
                                window.history.replaceState(null, '', newPath);
                            }
                        }
                        break; // Stop after finding the first match
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleNavClick = (id) => {
        setIsOpen(false);
        setActiveLink(id);

        // Determine target ID based on the link clicked
        const targetId = id || 'home';

        // Scroll to center of the viewport
        const element = document.getElementById(targetId);
        if (element) {
            // Use center block alignment as requested
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <header className={`header-wrapper ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="carousel-container">
                <div className="carousel-track">
                    <span className="carousel-text">GET FLAT 15% OFF ON OUR 3-MONTH PERSONAL TRAINING PLAN — GET FLAT 20% OFF ON OUR 6-MONTH PERSONAL TRAINING PLAN</span>
                    <span className="carousel-text">GET FLAT 15% OFF ON OUR 3-MONTH PERSONAL TRAINING PLAN — GET FLAT 20% OFF ON OUR 6-MONTH PERSONAL TRAINING PLAN</span>
                    <span className="carousel-text">GET FLAT 15% OFF ON OUR 3-MONTH PERSONAL TRAINING PLAN — GET FLAT 20% OFF ON OUR 6-MONTH PERSONAL TRAINING PLAN</span>
                    <span className="carousel-text">GET FLAT 15% OFF ON OUR 3-MONTH PERSONAL TRAINING PLAN — GET FLAT 20% OFF ON OUR 6-MONTH PERSONAL TRAINING PLAN</span>
                </div>
            </div>
            <nav className="navbar">
                <div className="container navbar-container">
                    <Link
                        to="/"
                        className="logo-container"
                        onClick={() => handleNavClick('home')}
                    >
                        {/* Placeholder for the user's logo. User should place their image in public/logo.png or src/assets */}
                        <img src="/logo.png" alt="FitEngineerss Logo" className="navbar-logo" onError={(e) => e.target.style.display = 'none'} />
                        <span className="logo-text">FIT<span className="text-highlight">ENGINEERSS</span></span>
                    </Link>

                    <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link
                                to="/"
                                className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                                onClick={() => handleNavClick('home')}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/about"
                                className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
                                onClick={() => handleNavClick('about')}
                            >
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/services"
                                className={`nav-link ${activeLink === 'services' ? 'active' : ''}`}
                                onClick={() => handleNavClick('services')}
                            >
                                Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/programs"
                                className={`nav-link ${activeLink === 'programs' ? 'active' : ''}`}
                                onClick={() => handleNavClick('programs')}
                            >
                                Programs
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/pricing"
                                className={`nav-link ${activeLink === 'pricing' ? 'active' : ''}`}
                                onClick={() => handleNavClick('pricing')}
                            >
                                Pricing
                            </Link>
                        </li>
                    </ul>

                    <div className="navbar-right">
                        <Link
                            to="/contact"
                            className="btn btn-primary nav-btn"
                            onClick={() => handleNavClick('contact')}
                        >
                            Book Consultation
                        </Link>
                        <div className="menu-icon" onClick={toggleMenu}>
                            {isOpen ? <X size={30} /> : <Menu size={30} />}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
