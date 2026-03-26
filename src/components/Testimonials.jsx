import React from 'react';
import { Star } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
    // Sample reviews based on the provided screenshot
    const reviews = [
        {
            id: 1,
            name: 'Deepak Kumar',
            avatar: '/client1.png',
            rating: 5,
            text: 'I heard about FITscript via Twitter after following Michael for a year. This program has cut out all the myths and BS with lifting and eating and has made it super simple to follow. The team has so much energy and sincere commitment to my health. Can\'t wait for my lab work and my future success to loving longer and a healthier life.',
            date: 'Feb 26, 2025'
        },
        {
            id: 2,
            name: 'Nishant Dubey',
            avatar: '/client2.png',
            rating: 5,
            text: 'Came across FitScript on X. Really awesome community of people looking to improve fitness and lifestyle. Direct and personalized coaching on stress reduction, nutrition, sleep, exercise and general health. Science backed approach that is easy to integrate into daily routine.',
            date: 'Feb 27, 2025'
        }
    ];

    return (
        <section id="testimonials" className="testimonials-section">
            <div className="container testimonials-container">

                {/* Left Side: Header & CTA */}
                <div className="testimonials-header">
                    <h2>OUR <span className="text-highlight">CLIENTS</span><br />ARE SAYING...</h2>

                    <div className="rating-summary">
                        <div className="avatars-group">
                            <img src="https://i.pravatar.cc/150?img=33" alt="user" className="tiny-avatar" />
                            <img src="https://i.pravatar.cc/150?img=59" alt="user" className="tiny-avatar" />
                            <img src="/client1.png" alt="user" className="tiny-avatar" />
                            <img src="/client2.png" alt="user" className="tiny-avatar" />
                        </div>
                        <div className="rating-text">
                            <div className="stars-row">
                                <span className="score">(4.8/5)</span>
                                <div className="stars-brand">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill="#0ea5e9" color="#0ea5e9" />
                                    ))}
                                </div>
                            </div>
                            <span className="user-count">From 150+ users</span>
                        </div>
                    </div>

                    <a href="#contact" className="btn btn-primary">
                        APPLY NOW
                    </a>
                </div>

                {/* Right Side: Reviews List */}
                <div className="reviews-list">
                    {reviews.map(review => (
                        <div key={review.id} className="review-card">
                            <div className="review-author">
                                <img src={review.avatar} alt={review.name} className="author-avatar" />
                                <span className="author-name">{review.name}</span>
                            </div>
                            <div className="review-stars">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={18} fill="#0ea5e9" color="#0ea5e9" />
                                ))}
                            </div>
                            <p className="review-text">
                                {review.text.split('The team has so much energy').length > 1 ? (
                                    <>
                                        {review.text.split('The team has so much energy')[0]}
                                        <span className="highlight-text">The team has so much energy{review.text.split('The team has so much energy')[1].split('Can\'t wait')[0]}</span>
                                        Can't wait{review.text.split('Can\'t wait')[1]}
                                    </>
                                ) : (
                                    review.text
                                )}
                            </p>
                            {review.date && <span className="review-date">{review.date}</span>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
