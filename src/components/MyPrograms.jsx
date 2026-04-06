import React from 'react';
import { usePopup } from '../context/PopupContext';
import './MyPrograms.css';

const MyPrograms = () => {
    const { openPopup } = usePopup();

    const programs = [
        {
            title: "Hypertrophy Master",
            desc: (
                <>
                    👉 Gain visible muscle with better digestion in 8 weeks<br /><br />

                    ✔️ Structured muscle-building plan<br /><br />
                    ✔️ Progressive overload system<br /><br />
                    ✔️ Gut-friendly nutrition<br /><br />
                    ✔️ Weekly tracking<br /><br />

                    👉 For: Skinny or stuck lifters
                </>
            ),
            level: "Intermediate",
            buttonText: "Start Building Muscle →"
        },
        {
            title: "Fat Eraser",
            desc: (
                <>
                    👉 Lose 3–5kg + reduce bloating in 8 weeks<br /><br />

                    ✔️ Simple fat loss workouts<br /><br />
                    ✔️ Easy Indian diet<br /><br />
                    ✔️ Gut-friendly combinations<br /><br />
                    ✔️ Habit system<br /><br />

                    👉 For: Busy professionals with fat gain + bloating<br /><br />
                </>
            ),
            level: "Beginner",
            buttonText: "Start Fat Loss →"
        },
        {
            title: "Athlete Performance",
            desc: (
                <>
                    👉 Build strength, speed & endurance without burnout<br /><br />

                    ✔️ Performance training<br /><br />
                    ✔️ Mobility + recovery<br /><br />
                    ✔️ Advanced nutrition<br /><br />

                    👉 For: Advanced trainees<br /><br />
                </>
            ),
            level: "Advanced",
            buttonText: "Upgrade Performance →"
        }
    ];

    return (
        <section id="programs" className="programs-section">
            <div className="container">
                <h2>MY <span className="text-accent">PROGRAMS</span></h2>
                <p className="about-text" style={{ fontWeight: '600', color: 'var(--accent-color)', marginBottom: '1.5rem', textAlign: 'center' }}>
                    👉 We don’t just train your body — we fix your gut.
                </p>
                <p className="program-subtitle">All programs include gut-friendly nutrition for better absorption & results.</p>
                <div className="programs-wrapper">
                    {programs.map((prog, index) => (
                        <article className="program-item" key={index}>
                            <div className="program-content">
                                <span className="program-level">{prog.level}</span>
                                <h3 className="program-title">{prog.title}</h3>
                                <div className="program-desc">{prog.desc}</div>
                                <button onClick={openPopup} className="program-link" style={{ textDecoration: 'underline', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0, color: 'var(--accent-color)' }}>{prog.buttonText || "Join Program →"}</button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MyPrograms;
