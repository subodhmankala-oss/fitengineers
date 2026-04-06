import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="container hero-content">
                <h1 className="hero-title">
                    <span className="title-primary">Build Muscle. <span className="text-accent">Lose Fat.</span> Fix Your Gut.</span>
                    <span className="title-secondary"><span className="text-accent"> Eating healthy but still bloated?</span><br></br>Training hard but not seeing results?</span>
                </h1>
                <p className="hero-subtitle">
                    We don’t just train your body — we fix your gut.

                </p>
                <div className="hero-btns">
                    <Link to="/contact" className="btn btn-primary">Start Transformation</Link>
                    <Link to="/services" className="btn btn-outline">Fix My Gut</Link>
                </div>
            </div>
        </section >
    );
};

export default Hero;
