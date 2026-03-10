import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="hero-overlay"></div>
            <div className="container hero-content">
                <h1 className="hero-title">
                    TRANSFORM YOUR <span className="text-accent">BODY</span><br />
                    TRANSFORM YOUR <span className="text-accent">LIFE</span>
                </h1>
                <p className="hero-subtitle">
                    Professional personal training tailored to your unique goals.
                    Start your journey to a stronger, healthier you today.
                </p>
                <div className="hero-btns">
                    <Link to="/contact" className="btn btn-primary">Get Started</Link>
                    <Link to="/services" className="btn btn-outline">Learn More</Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
