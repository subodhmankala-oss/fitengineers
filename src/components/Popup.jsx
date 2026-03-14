import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Popup.css';

const Popup = ({ externalOpen, setExternalOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        city: '',
        area: '',
        program: '',
        goal: ''
    });

    useEffect(() => {
        // Show popup on component mount (page load) if not externally controlled yet
        const timer = setTimeout(() => {
            if (externalOpen === undefined) {
                setIsOpen(true);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [externalOpen]);

    // Sync external state changes
    useEffect(() => {
        if (externalOpen !== undefined) {
            setIsOpen(externalOpen);
            if (externalOpen) {
                // Reset form to step 1 when reopened externally
                setStep(1);
            }
        }
    }, [externalOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use EmailJS to send the form data
        // Note: You'll need to replace these placeholders with your actual EmailJS credentials
        // SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            city: formData.city,
            area: formData.area,
            program: formData.program,
            goal: formData.goal
        };

        emailjs.send(
            'service_z2euvfp', // Replace with your standard EmailJS Service ID
            'template_ampld46', // Replace with your EmailJS Template ID
            templateParams,
            'ojA8Hbo_W64Y_gLPO' // Replace with your EmailJS Public Key
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                handleNext(); // Move to success step
            })
            .catch((error) => {
                console.log('FAILED...', error);
                alert("Failed to send email. Please try again later.");
            });
    };

    const closePopup = () => {
        setIsOpen(false);
        if (setExternalOpen) {
            setExternalOpen(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="popup-close-btn" onClick={closePopup}>
                    <X size={24} />
                </button>

                {step === 3 ? (
                    <div className="popup-success">
                        <div className="success-icon">
                            <Check size={48} />
                        </div>
                        <h2>Thank You!</h2>
                        <p>We have received your details and will be in touch shortly.</p>
                        <button className="btn btn-primary" onClick={closePopup}>Close</button>
                    </div>
                ) : (
                    <>
                        <div className="popup-header">
                            <h2>JOIN WITH US</h2>
                            <p>Fill out the form below, and we will be in touch shortly.</p>
                        </div>

                        <div className="popup-stepper">
                            <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>1</div>
                            <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>2</div>
                            <div className={`step-indicator ${step >= 3 ? 'active' : ''}`}>3</div>
                        </div>

                        <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                            <div className="popup-body">
                                {step === 1 && (
                                    <div className="step-content">
                                        <h3>Contact Information</h3>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                className="popup-input"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone Number"
                                                className="popup-input"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                className="popup-input"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="city"
                                                placeholder="City / District"
                                                className="popup-input"
                                                value={formData.city}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="area"
                                                placeholder="Area / Locality"
                                                className="popup-input"
                                                value={formData.area}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="step-content">
                                        <h3>Program Selection</h3>
                                        <div className="form-group">
                                            <label>Which Program Are You Interested In?</label>
                                            <select
                                                name="program"
                                                className="popup-input popup-select"
                                                value={formData.program}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Program</option>
                                                <option value="Virtual Personal Training">Virtual Personal Training</option>
                                                <option value="1-on-1 Training">1-on-1 Training</option>
                                                <option value="Nutrition Planning">Nutrition Planning</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Your Fitness Goal</label>
                                            <select
                                                name="goal"
                                                className="popup-input popup-select"
                                                value={formData.goal}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select goal</option>
                                                <option value="Weight Loss">Weight Loss</option>
                                                <option value="Muscle Gain">Muscle Gain</option>
                                                <option value="General Fitness">General Fitness</option>
                                                <option value="Athletic Performance">Athletic Performance</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="popup-footer">
                                {step > 1 && (
                                    <button type="button" className="btn-back" onClick={handleBack}>
                                        &larr; BACK
                                    </button>
                                )}
                                <button type="submit" className="btn-next">
                                    {step === 2 ? 'SUBMIT' : 'NEXT'} &rarr;
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default Popup;
