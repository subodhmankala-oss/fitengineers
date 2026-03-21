import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { usePopup } from '../context/PopupContext';
import './Pricing.css';


const Pricing = () => {
    const { openPopup } = usePopup();

    const onlinePlans = [
        {
            name: "Personalised Workout + Nutrition Plan",
            price: "₹8,000",
            period: "Monthly",
            features: []
        },
        {
            name: "Personalised Workout + Nutrition Plan",
            price: "₹22,000",
            period: "3 Months",
            features: [],
            popular: true
        },
        {
            name: "Personalised Workout + Nutrition Plan",
            price: "₹40,000",
            period: "6 Months",
            features: []
        }
    ];

    const plans = [
        {
            name: "Basic",
            price: "Inr 15,000",
            period: "Monthly",
            features: []
        },
        {
            name: "Pro",
            price: "Inr 36,000",
            period: "3 Months",
            features: [],
            popular: true
        },
        {
            name: "Elite",
            price: "Inr 62,000",
            period: "6 Months",
            features: []
        }
    ];

    const couplePlans = [
        {
            name: "Couple Plan",
            price: "₹15,000",
            period: "Monthly",
            features: []
        },
        {
            name: "Couple Plan",
            price: "₹40,000",
            period: "3 Months",
            features: [],
            popular: true
        },
        {
            name: "Couple Plan",
            price: "₹70,000",
            period: "6 Months",
            features: []
        }
    ];

    return (
        <section id="pricing" className="pricing-section">
            <div className="container">
                <h2>Choose your <span className="text-accent">Commitment level</span></h2>
                <p className='text-center-s service-desc'>Our premium fitness package delivers a custom workout plan, comprehensive nutrition guide, 24/7 expert support, Monthly changes in Workout & Nutrition plan and in-depth video analysis for optimal results. </p>

                <h3 className="section-subtitle" style={{ textAlign: 'center', marginTop: '60px', marginBottom: '40px', fontSize: '2rem', color: 'var(--text-primary)' }}>Online 1-on-1 Training</h3>
                <div className="pricing-grid">
                    {onlinePlans.map((plan, index) => (
                        <article className={`pricing-card ${plan.popular ? 'popular' : ''}`} key={`online-${index}`}>
                            {plan.popular && <div className="popular-badge">Most Popular</div>}
                            <h3 className="plan-name" style={{ fontSize: '1.25rem', lineHeight: '1.4' }}>{plan.name}</h3>
                            <div className="plan-price" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                <div><span className="currency"></span>{plan.price}</div>
                                <div className="period" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>{plan.period}</div>
                            </div>
                            <ul className="plan-features">
                                {plan.features.map((feature, i) => (
                                    <li key={i}>
                                        <Check size={18} className="check-icon" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={openPopup} className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} w-100 mt-auto`}>Join Now</button>
                        </article>
                    ))}
                </div>

                <h3 className="section-subtitle" style={{ textAlign: 'center', marginTop: '80px', marginBottom: '40px', fontSize: '2rem', color: 'var(--text-primary)' }}>On Site</h3>
                <div className="pricing-grid">
                    {plans.map((plan, index) => (
                        <article className={`pricing-card ${plan.popular ? 'popular' : ''}`} key={index}>
                            {plan.popular && <div className="popular-badge">Most Popular</div>}
                            <h3 className="plan-name">{plan.name}</h3>
                            <div className="plan-price" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                <div><span className="currency"></span>{plan.price}</div>
                                <div className="period" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>{plan.period}</div>
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

                <h3 className="section-subtitle" style={{ textAlign: 'center', marginTop: '80px', marginBottom: '40px', fontSize: '2rem', color: 'var(--text-primary)' }}>Couple Plans</h3>
                <div className="pricing-grid">
                    {couplePlans.map((plan, index) => (
                        <article className={`pricing-card ${plan.popular ? 'popular' : ''}`} key={index}>
                            {plan.popular && <div className="popular-badge">Most Popular</div>}
                            <h3 className="plan-name">{plan.name}</h3>
                            <div className="plan-price" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                <div><span className="currency"></span>{plan.price}</div>
                                <div className="period" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>{plan.period}</div>
                            </div>
                            <ul className="plan-features">
                                {plan.features.map((feature, i) => (
                                    <li key={i}>
                                        <Check size={18} className="check-icon" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={openPopup} className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} w-100 mt-auto`}>Join Now</button>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
