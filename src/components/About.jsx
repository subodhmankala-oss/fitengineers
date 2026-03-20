import React from 'react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container about-container">
                <div className="about-image">
                    {/* Placeholder for trainer image - User should save their image as trainer.png in public folder */}
                    <img src="/trainer.png" alt="Subodh Mankala - Certified Personal Trainer in Hyderabad" className="trainer-img" loading="lazy" onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }} />

                    {/* Fallback placeholder if image fails to load */}
                    <div className="img-placeholder" style={{ display: 'none' }}>
                        <span>Trainer Image</span>
                    </div>
                </div>
                <div className="about-content">
                    <h2 className="section-title">ABOUT <span className="text-accent">ME</span></h2>
                    <p className="about-text">
                        Hi, I'm [Subodh Mankala]. With over 10 years of experience in the fitness industry,
                        I've helped hundreds of clients achieve their body goals.
                    </p>
                    <p className="about-text">
                        My philosophy is simple: sustainable habits create lasting results.
                        I don't just tell you what to do; I teach you how to maintain a healthy lifestyle forever.
                        Whether you want to lose weight, build muscle, or improve your overall health,
                        I have the expertise to get you there.
                    </p>
                    <div className="about-stats">
                        <div className="stat-item">
                            <span className="stat-number">10+</span>
                            <span className="stat-label">Years Exp</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Clients</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Dedication</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
