import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="container hero-content">
                <h1 className="hero-title">
                    <span className="title-primary">Build Muscle. <span className="text-accent">Lose Fat.</span> Fix Your Gut.</span>
                    <span className="title-secondary">No confusion. <span className="text-accent">No bloating.</span> Just results.</span>
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
        </section >
    );
};

export default Hero;
