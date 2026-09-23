import React from 'react';
import {
    Headset, Download, Dumbbell, PersonStanding, MessageCircle, TrendingUp, ArrowRight,
    Trophy, Flame, Scale, Moon, Footprints, FileBarChart, Utensils, ClipboardCheck, Timer, HeartPulse,
} from 'lucide-react';
import { usePopup } from '../context/PopupContext';
import { APP_URL } from '../data/appLinks';
import './AppPromo.css';

const features = [
    { icon: <Dumbbell size={16} />, label: 'Coach-built workouts' },
    { icon: <PersonStanding size={16} />, label: 'Muscle balance map' },
    { icon: <TrendingUp size={16} />, label: 'Track your progress' },
];

const feedColumns = [
    {
        duration: '116s',
        cards: [
            { icon: Trophy, tone: 'gold', title: 'New PR', text: 'Bench Press · 80 kg × 8' },
            { icon: Dumbbell, tone: 'blue', title: 'Workout logged', text: 'Upper Body · 52 min' },
            { icon: Utensils, tone: 'green', title: 'Protein', text: '142 / 150 g today' },
            { icon: ClipboardCheck, tone: 'blue', title: 'Check-in sent', text: 'Photos + weight' },
            { icon: Timer, tone: 'orange', title: 'Rest timer', text: '90 s · Set 3 of 4' },
        ],
    },
    {
        duration: '140s',
        reverse: true,
        cards: [
            { icon: Flame, tone: 'orange', title: '7-day streak', text: 'Keep it going' },
            { icon: MessageCircle, tone: 'blue', title: 'Coach', text: 'Great depth on squats!' },
            { icon: Scale, tone: 'green', title: 'Body weight', text: '72.4 kg · ↓ 0.6 kg' },
            { icon: Moon, tone: 'purple', title: 'Sleep', text: '7 h 40 m last night' },
            { icon: Trophy, tone: 'gold', title: 'New PR', text: 'Deadlift · 140 kg' },
        ],
    },
    {
        duration: '126s',
        cards: [
            { icon: HeartPulse, tone: 'red', title: 'Calories burned', text: '540 kcal · Leg day' },
            { icon: FileBarChart, tone: 'purple', title: 'Monthly report', text: 'Ready to view' },
            { icon: Footprints, tone: 'green', title: 'Steps', text: '9,842 today' },
            { icon: PersonStanding, tone: 'blue', title: 'Muscle map', text: 'Legs need work' },
            { icon: ClipboardCheck, tone: 'orange', title: 'Plan updated', text: 'By your coach' },
        ],
    },
];

const FeedCard = ({ icon, tone, title, text }) => {
    const Icon = icon;
    return (
        <div className="feed-card">
            <span className={`feed-card-icon ${tone}`}><Icon size={16} /></span>
            <span className="feed-card-body">
                <strong>{title}</strong>
                <small>{text}</small>
            </span>
        </div>
    );
};

const AppPromo = () => {
    const { openPopup } = usePopup();

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
                        <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="app-promo-start">
                            Get started <ArrowRight size={18} />
                        </a>
                        <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="app-promo-download">
                            <Download size={18} /> Download Now
                        </a>
                    </div>
                    <p className="app-promo-note">
                        Works in your browser — no install needed.
                        <button type="button" className="app-promo-expert" onClick={openPopup}>
                            <Headset size={15} /> Talk to an expert
                        </button>
                    </p>
                </div>
            </div>

            <div className="app-promo-visual">
                <div className="app-promo-feed" aria-hidden="true">
                    {feedColumns.map((col, i) => (
                        <div className="feed-col" key={i}>
                            <div
                                className={`feed-track${col.reverse ? ' reverse' : ''}`}
                                style={{ animationDuration: col.duration }}
                            >
                                {Array.from({ length: 10 }, () => col.cards).flat().map((card, j) => (
                                    <FeedCard key={j} {...card} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
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
            </div>
        </section>
    );
};

export default AppPromo;
