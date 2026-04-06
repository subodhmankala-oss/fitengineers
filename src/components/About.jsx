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
                    <div className="about-text-content">
                        <p className="about-text">
                            I help people lose fat, build muscle, and fix their gut — <strong>without confusion</strong>.
                        </p>

                        <p className="about-text" style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Most people I work with are:</p>
                        <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                            <li style={{ marginBottom: '0.5rem' }}>• Eating "healthy" but still bloated</li>
                            <li style={{ marginBottom: '0.5rem' }}>• Training hard but not seeing results</li>
                            <li style={{ marginBottom: '0.5rem' }}>• Feeling low energy despite doing everything right</li>
                        </ul>

                        <p className="about-text" style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                            <strong>That’s where I come in.</strong>
                        </p>

                        <p className="about-text" style={{ marginTop: '1rem' }}>
                            Instead of complicated diets and random workouts, I focus on 3 things that actually change your body:
                        </p>

                        <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                            <li style={{ marginBottom: '0.5rem' }}>✔️ Structured training</li>
                            <li style={{ marginBottom: '0.5rem' }}>✔️ Simple, sustainable nutrition</li>
                            <li style={{ marginBottom: '0.5rem' }}>✔️ Gut health (because absorption = results)</li>
                        </ul>

                        <p className="about-text" style={{ fontWeight: '600', color: 'var(--accent-color)', marginBottom: '1.5rem' }}>
                            👉 When your gut works better, your body starts responding.
                        </p>

                        <p className="about-text">
                            Over the last 10+ years, I’ve helped hundreds of clients not just transform their physique — but <strong>fix the way their body works</strong>.
                        </p>
                    </div>
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
                </div >
            </div >
        </section >
    );
};

export default About;
