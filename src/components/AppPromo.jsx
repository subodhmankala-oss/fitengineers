import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Headset, Check, Download, Dumbbell, PersonStanding, MessageCircle, TrendingUp } from 'lucide-react';
import { usePopup } from '../context/PopupContext';
import { APP_URL } from '../data/appLinks';
import './AppPromo.css';

const features = [
    { icon: <Dumbbell size={16} />, label: 'Coach-built workouts' },
    { icon: <PersonStanding size={16} />, label: 'Muscle balance map' },
    { icon: <TrendingUp size={16} />, label: 'Track your progress' },
];

const AppPromo = () => {
    const { openPopup } = usePopup();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        emailjs.send(
            'service_z2euvfp',
            'template_ampld46',
            { from_name: 'App signup', from_email: email, program: 'FitEngineers App' },
            'ojA8Hbo_W64Y_gLPO'
        )
            .then(() => setStatus('sent'))
            .catch(() => setStatus('error'));
    };

    return (
        <section className="app-promo" id="home">
            <div className="app-promo-copy">
                <div className="app-promo-copy-inner">
                    <span className="app-promo-eyebrow">The FitEngineers App</span>
                    <h1 className="app-promo-title">
                        Solo or with a coach<span className="app-promo-title-dash"> —</span>
                        <span className="text-accent app-promo-title-accent">track it all in one app</span>
                    </h1>
                    <p className="app-promo-text">
                        <strong>Training on your own?</strong> Log every set, follow your plan and watch
                        your muscle balance map show exactly what&apos;s overtrained and what&apos;s being
                        skipped. <strong>Working with a coach?</strong> They see it all too, and fine-tune
                        your plan week by week. Download the app and log your first workout today.
                    </p>

                    <ul className="app-promo-features">
                        {features.map((f) => (
                            <li key={f.label}>{f.icon}{f.label}</li>
                        ))}
                    </ul>

                    <div className="app-promo-cta">
                        {status === 'sent' ? (
                            <div className="app-promo-success">
                                <Check size={20} /> Thanks! We&apos;ll send your app access to {email}.
                            </div>
                        ) : (
                            <form className="app-promo-form" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    aria-label="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button type="submit" disabled={status === 'sending'}>
                                    {status === 'sending' ? 'Sending…' : 'Get started'}
                                </button>
                            </form>
                        )}
                        <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="app-promo-download">
                            <Download size={18} /> Download Now
                        </a>
                    </div>
                    <p className="app-promo-note">
                        {status === 'error'
                            ? 'Something went wrong. Please try again.'
                            : 'Leave your email and we’ll get you set up in the app.'}
                        <button type="button" className="app-promo-expert" onClick={openPopup}>
                            <Headset size={15} /> Talk to an expert
                        </button>
                    </p>
                </div>
            </div>

            <div className="app-promo-visual">
                <div className="phone" aria-hidden="true">
                    <div className="phone-notch" />
                    <div className="phone-screen">
                        <div className="phone-header">
                            <span className="phone-kicker">Your training, visualised</span>
                            <span className="phone-title">Muscle Balance</span>
                        </div>

                        <div className="phone-tabs">
                            <span>7 days</span>
                            <span className="active">30 days</span>
                            <span>90 days</span>
                        </div>

                        <div className="phone-map">
                            <div className="phone-figures">
                                <figure>
                                    <figcaption>Front</figcaption>
                                    <img src="/app-muscle-front.png" alt="" />
                                </figure>
                                <figure>
                                    <figcaption>Back</figcaption>
                                    <img src="/app-muscle-back.png" alt="" />
                                </figure>
                            </div>
                            <div className="phone-legend">
                                <div className="phone-legend-bar" />
                                <div className="phone-legend-labels">
                                    <span>Skipped</span>
                                    <span>Balanced</span>
                                    <span>Overtrained</span>
                                </div>
                            </div>
                        </div>

                        <div className="phone-stats">
                            <div className="phone-stat hot">
                                <small>Hottest</small>
                                <strong>Shoulders</strong>
                            </div>
                            <div className="phone-stat cold">
                                <small>Coldest</small>
                                <strong>Calves</strong>
                            </div>
                        </div>

                        <div className="phone-note">
                            <MessageCircle size={16} />
                            <div>
                                <strong>Your coach spotted it</strong>
                                <small>Extra calf work has been added to this week&apos;s plan.</small>
                            </div>
                        </div>
                        <div className="phone-home-bar" />
                    </div>
                </div>
                <p className="app-promo-credit">
                    Body illustration adapted from wger (Termininja, CC BY-SA 3.0)
                </p>
            </div>
        </section>
    );
};

export default AppPromo;
