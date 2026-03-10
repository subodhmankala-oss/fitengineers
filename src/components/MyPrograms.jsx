import React from 'react';
import { usePopup } from '../context/PopupContext';
import './MyPrograms.css';

const MyPrograms = () => {
    const { openPopup } = usePopup();

    const programs = [
        {
            title: "Hypertrophy Master",
            desc: "An 8-week program focused on maximum muscle growth using scientific principles of volume and intensity.",
            level: "Intermediate"
        },
        {
            title: "Fat Eraser",
            desc: "High-intensity interval training combined with strength circuits to burn fat while preserving muscle.",
            level: "Beginner"
        },
        {
            title: "Athlete Performance",
            desc: "Explosive power and agility training designed for competitive athletes looking to gain an edge.",
            level: "Advanced"
        }
    ];

    return (
        <section id="programs" className="programs-section">
            <div className="container">
                <h2>MY <span className="text-accent">PROGRAMS</span></h2>
                <div className="programs-wrapper">
                    {programs.map((prog, index) => (
                        <div className="program-item" key={index}>
                            <div className="program-content">
                                <span className="program-level">{prog.level}</span>
                                <h3 className="program-title">{prog.title}</h3>
                                <p className="program-desc">{prog.desc}</p>
                                <button onClick={openPopup} className="program-link" style={{ textDecoration: 'underline', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>Join Program &rarr;</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MyPrograms;
