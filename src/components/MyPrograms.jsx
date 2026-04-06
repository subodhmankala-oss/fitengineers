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
                    An 8-week program focused on maximum muscle growth using scientific principles of volume and intensity.<br /><br />
                    Build visible muscle without guesswork.<br /><br />
                    For lifters who are stuck at the same size despite training regularly.<br /><br />
                    ✔️ Structured 8-week muscle plan<br />
                    ✔️ Progressive overload system<br />
                    ✔️ Gut-friendly diet guidance (better absorption = better growth)<br />
                    ✔️ Weekly tracking & adjustments<br /><br />
                    👉 If you’re training hard but not growing, this fixes it.
                </>
            ),
            level: "Intermediate",
            buttonText: "Start Building Muscle →"
        },
        {
            title: "Fat Eraser",
            desc: (
                <>
                    High-intensity interval training combined with strength circuits to burn fat while preserving muscle.<br /><br />
                    Lose fat without starving or ruining your gut.<br /><br />
                    Perfect for busy professionals who feel bloated, low energy, and inconsistent.<br /><br />
                    ✔️ Simple fat-loss workouts (no confusion)<br />
                    ✔️ Easy-to-follow diet (Indian + gut-friendly)<br />
                    ✔️ Habit system for consistency<br />
                    ✔️ Bloating & digestion fixes<br /><br />
                    👉 Lose fat, feel light, and stay consistent.
                </>
            ),
            level: "Beginner",
            buttonText: "Start Fat Loss →"
        },
        {
            title: "Athlete Performance",
            desc: (
                <>
                    Explosive power and agility training designed for competitive athletes looking to gain an edge.<br /><br />
                    Train like an athlete, not just a gym-goer.<br /><br />
                    For advanced lifters who want strength, speed, and performance.<br /><br />
                    ✔️ Power + strength programming<br />
                    ✔️ Mobility & injury prevention<br />
                    ✔️ Performance nutrition<br />
                    ✔️ Recovery protocols<br /><br />
                    👉 Build a body that performs, not just looks good.
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
