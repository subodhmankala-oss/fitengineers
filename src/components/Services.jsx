import React from 'react';
import { Dumbbell, Utensils, Monitor } from 'lucide-react';
import './Services.css';

const Services = () => {
    const services = [
        {
            icon: <Dumbbell size={48} />,
            title: "1-on-1 Training",
            description: "Personalized workout sessions designed to push your limits and maximize results."
        },
        {
            icon: <Utensils size={48} />,
            title: "Nutrition Planning",
            description: "Custom meal plans tailored to your dietary needs and fitness goals."
        },
        {
            icon: <Monitor size={48} />,
            title: "Online Coaching",
            description: "Remote guidance, workout programming, and weekly check-ins tailored to your schedule."
        }
    ];

    return (
        <section id="services" className="services-section">
            <div className="container">
                <h2>MY <span className="text-accent">SERVICES</span></h2>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <article className="service-card" key={index}>
                            <div className="service-icon">{service.icon}</div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
