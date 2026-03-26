import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowLeft } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const isManualNavigation = useRef(false);
    const scrollTimeout = useRef(null);

    useEffect(() => {
        // Update active link based on current path
        const path = location.pathname;
        if (path === '/') setActiveLink('home');
        else if (path.startsWith('/blog')) setActiveLink('blog');
        else setActiveLink(path.substring(1));
    }, [location.pathname]);

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

            // Skip spy logic if we are auto-scrolling due to a click
            if (isManualNavigation.current) return;

            // Scroll Spy Logic
            const sections = ['home', 'about', 'services', 'programs', 'pricing', 'contact'];

            // Find the section that is currently active in the middle of the viewport
            const viewportCenter = window.innerHeight / 2;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if the center of the viewport intersects this element
                    if (rect.top <= viewportCenter && rect.bottom > viewportCenter) {
                        if (activeLink !== sectionId) {
                            setActiveLink(sectionId);
                            // Update URL using React Router without causing Home to auto-scroll
                            const newPath = sectionId === 'home' ? '/' : `/${sectionId}`;
                            if (location.pathname !== newPath) {
                                navigate(newPath, { replace: true, state: { preventScroll: true } });
                            }
                        }
                        break; // Stop after finding the match
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
        setIsDropdownOpen(false);
        setActiveLink(id);

        // Lock scroll spy to prevent URL glitches during smooth scroll
        isManualNavigation.current = true;
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
            isManualNavigation.current = false;
        }, 1200); // 1.2s timeout for smooth scroll to finish
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
                        <li className="nav-item dropdown">
                            <Link
                                to="/blog"
                                className={`nav-link ${activeLink === 'blog' ? 'active' : ''}`}
                                onClick={(e) => {
                                    if (window.innerWidth <= 960) {
                                        e.preventDefault();
                                        setIsDropdownOpen(!isDropdownOpen);
                                    } else {
                                        handleNavClick('blog');
                                    }
                                }}
                            >
                                Article <ChevronDown size={14} style={{ marginLeft: '2px', position: 'relative', top: '2px' }} />
                            </Link>
                            <ul className={`dropdown-menu ${isDropdownOpen ? 'mobile-open' : ''}`}>
                                <li className="mobile-back-btn" onClick={() => setIsDropdownOpen(false)}>
                                    <ArrowLeft size={24} /> <span>Back</span>
                                </li>
                                <li><Link to="/blog?category=Nutrition" onClick={() => handleNavClick('blog')}>Nutrition</Link></li>
                                <li><Link to="/blog?category=Fitness" onClick={() => handleNavClick('blog')}>Fitness</Link></li>
                                <li><Link to="/blog?category=Wellness" onClick={() => handleNavClick('blog')}>Wellness</Link></li>
                                <li><Link to="/ideal-body-calculator" onClick={() => handleNavClick('ideal-body-calculator')}>Ideal body calculator</Link></li>
                            </ul>
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
