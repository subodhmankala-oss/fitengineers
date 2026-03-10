import React from 'react';
import './Contact.css';

const Contact = () => {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "bd33bc76-acab-4d9b-a514-b3f51da1d479");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container contact-container">
                <h2>GET IN <span className="text-accent">TOUCH</span></h2>
                <div className="contact-wrapper">
                    <form className="contact-form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="text" name="from_name" placeholder="Name" className="form-input" required />
                        </div>
                        <div className="form-group">
                            <input type="email" name="from_email" placeholder="Email" className="form-input" required />
                        </div>
                        <div className="form-group">
                            <input type="tel" name="phone" placeholder="Phone Number" className="form-input" required />
                        </div>
                        <div className="form-group">
                            <input type="text" name="city" placeholder="City" className="form-input" required />
                        </div>
                        <div className="form-group">
                            <input type="text" name="area" placeholder="Area" className="form-input" required />
                        </div>
                        <div className="form-group">
                            <select name="program" className="form-input" required defaultValue="">
                                <option value="" disabled>Select a Program</option>
                                <option value="Virtual Personal Training">Virtual Personal Training</option>
                                <option value="In-Person Personal Training">In-Person Personal Training</option>
                                <option value="Nutrition Coaching">Nutrition Coaching</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text" name="goal" placeholder="Your Goal (e.g. Muscle Gain, Weight Loss)" className="form-input" required />
                        </div>
                        <button type="submit" className="btn btn-primary submit-btn">Send Message</button>
                    </form>
                    <span>{result}</span>
                </div>
            </div>
        </section>
    );
};

export default Contact;
