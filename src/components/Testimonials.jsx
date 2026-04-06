import React from 'react';
import { Star } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
    const transformations = [
        {
            id: 1,
            name: 'Rahul Sharma',
            image: '/real_male_1.png',
            stat: 'Dropped 12kg Fast',
            text: 'I finally broke through my plateau. Dropped the gut, built actual shoulder muscle, and I feel incredible.'
        },
        {
            id: 2,
            name: 'Priya Patel',
            image: '/real_female_1.png',
            stat: 'Lost 4 Dress Sizes',
            text: 'Getting my nutrition dialed in fixed my digestion. The fat melted off my waist without me feeling starved.'
        },
        {
            id: 3,
            name: 'Vikram Singh',
            image: '/real_male_2.png',
            stat: 'From 25% to 12% Fat',
            text: 'Shed my dad bod. The 1-on-1 accountability made lifting simple and effective while letting me eat food I love.'
        },
        {
            id: 4,
            name: 'Anjali Desai',
            image: '/real_female_2.png',
            stat: 'Completely Toned Up',
            text: 'I never thought I could build this much tone with simple home workouts and a protein-first approach. Insane results.'
        },
        {
            id: 5,
            name: 'Karan Verma',
            image: '/real_male_3.png',
            stat: 'Gained Strong Muscle',
            text: 'Went from skinny-fat to actually looking like I lift. The hyper-specific program transformed my chest and arms.'
        },
        {
            id: 6,
            name: 'Neha Gupta',
            image: '/real_female_3.png',
            stat: 'Broke My Plateau',
            text: 'I used to do empty cardio for hours. Switching to structured weight training gave me the exact results I wanted.'
        },
        {
            id: 7,
            name: 'Arjun Mehta',
            image: '/real_male_4.png',
            stat: 'Built 8kg Lean Mass',
            text: 'Total recomp. I struggled to put on any size before, but the direct coaching forced me to eat and lift properly.'
        },
        {
            id: 8,
            name: 'Sneha Reddy',
            image: '/real_female_4.png',
            stat: 'Lost Belly Fat',
            text: 'The daily adjustments kept me on track. I finally have the slim, toned midsection I’ve been chasing for years.'
        }
    ];

    return (
        <section id="testimonials" className="transformations-section">
            <div className="container">
                <div className="transformations-header">
                    <h2>CLIENT <span className="text-highlight">TRANSFORMATIONS</span></h2>
                    <p className="transformations-subtitle">Real results from real people. Zero guesswork.</p>
                </div>
            </div>

            <div className="transformations-grid edge-to-edge">
                {transformations.map(client => (
                    <article key={client.id} className="transformation-card">
                        <div className="transformation-img-container">
                            <img src={client.image} alt={`${client.name} Transformation`} className="transformation-img" />
                        </div>
                        <div className="transformation-content">
                            <div className="review-stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                                ))}
                            </div>
                            <h3 className="client-name">{client.name} <span className="stat-tag">— {client.stat}</span></h3>
                            <p className="client-text">"{client.text}"</p>
                        </div>
                    </article>
                ))}
            </div>

            <div className="container">
                <div className="transformations-cta">
                    <a href="#contact" className="btn btn-primary">START YOUR TRANSFORMATION</a>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
