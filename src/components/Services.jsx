import React from 'react';
import { usePopup } from '../context/PopupContext';
import { Dumbbell, Utensils, Monitor } from 'lucide-react';
import './Services.css';

const Services = () => {
    const { openPopup } = usePopup();

    const services = [
        {
            icon: <Dumbbell size={48} />,
            title: "1-on-1 Coaching",
            buttonText: "Book a Session →",
            description: (
                <>
                    Train with structure. Not guesswork.<br /><br />
                    For people serious about transforming their body with direct coaching.<br /><br />
                    ✔️ Customized workouts based on your level<br />
                    ✔️ Form correction & real-time guidance<br />
                    ✔️ Strength + fat loss focused sessions<br />
                    ✔️ Accountability to stay consistent<br /><br />
                    👉 No distractions. Just results.
                </>
            )
        },
        {
            icon: <Utensils size={48} />,
            title: "Gut-Friendly Nutrition Plan",
            buttonText: "Get My Plan →",
            description: (
                <>
                    Eat better. Digest better. Perform better.<br /><br />
                    For people struggling with bloating, low energy, or poor results despite eating “healthy”.<br /><br />
                    ✔️ Simple Indian diet (no extreme restrictions)<br />
                    ✔️ Gut-friendly meal combinations<br />
                    ✔️ Protein optimization for muscle & fat loss<br />
                    ✔️ Easy-to-follow structure (no confusion)<br /><br />
                    👉 Fix your diet, fix your results.
                </>
            )
        },
        {
            icon: <Monitor size={48} />,
            title: "Online Coaching (Complete Transformation)",
            buttonText: "Start Coaching →",
            description: (
                <>
                    Your training + diet + accountability — all in one.<br /><br />
                    For busy professionals who want results without confusion.<br /><br />
                    ✔️ Workout plan (home/gym)<br />
                    ✔️ Nutrition + gut correction<br />
                    ✔️ Weekly check-ins & adjustments<br />
                    ✔️ Direct support & guidance<br /><br />
                    👉 Stay consistent. See real progress.
                </>
            )
        }
    ];

    return (
        <section id="services" className="services-section">
            <div className="container">
                <h2>MY <span className="text-accent">SERVICES</span></h2>
                <p className="about-text" style={{ fontWeight: '600', color: 'var(--accent-color)', marginBottom: '1.5rem', textAlign: 'center' }}>
                    👉 We don’t just train your body — we fix your gut.
                </p>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <article className="service-card" key={index}>
                            <div className="service-icon">{service.icon}</div>
                            <h3 className="service-title">{service.title}</h3>
                            <div className="service-desc">{service.description}</div>
                            <button onClick={openPopup} className="service-link" style={{ textDecoration: 'underline', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: '10px 0', marginTop: '15px', color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '1rem', display: 'inline-block' }}>{service.buttonText}</button>
                        </article>
                    ))}
                </div>
            </div>
        </section >
    );
};

export default Services;
