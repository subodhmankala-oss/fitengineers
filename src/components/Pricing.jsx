import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { usePopup } from '../context/PopupContext';
import './Pricing.css';


const Pricing = () => {
    const { openPopup } = usePopup();

    const plans = [
        {
            name: "Basic",
            price: "Inr 15,000",
            period: "/mo",
            features: ["Custom Workout Plan", "Weekly Check-ins", "Nutritional Plan Support Goals"]
        },
        {
            name: "Pro",
            price: "Inr 36,000",
            period: "/3 months",
            features: ["Custom Workout Plan", "Nutrition Guide", "24/7 Support", "Video Analysis", "Community Access"],
            popular: true
        },
        {
            name: "Elite",
            price: "Inr 65,000",
            period: "/6 months",
            features: ["1-on-1 Virtual Sessions", "Advanced Nutrition Plan", "Daily Accountability", "Priority Support", "All Pro Features"]
        }
    ];

    return (
        <section id="pricing" className="pricing-section">
            <div className="container">
                <h2>Choose your <span className="text-accent">Commitment level</span></h2>
                <div className="pricing-grid">
                    {plans.map((plan, index) => (
                        <article className={`pricing-card ${plan.popular ? 'popular' : ''}`} key={index}>
                            {plan.popular && <div className="popular-badge">Most Popular</div>}
                            <h3 className="plan-name">{plan.name}</h3>
                            <div className="plan-price">
                                <span className="currency"></span>{plan.price}<span className="period">{plan.period}</span>
                            </div>
                            <ul className="plan-features">
                                {plan.features.map((feature, i) => (
                                    <li key={i}>
                                        <Check size={18} className="check-icon" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={openPopup} className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} w-100 mt-auto`}>Choose Plan</button>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
