// src/pages/Contact.js
import React, { useState } from 'react';
import './Contact.css';

function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <div className="contact-container">
            <h2 className="contact-title">📩 Contact Us</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="contact-input"
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="contact-input"
                />
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    className="contact-textarea"
                />
                <button type="submit" className="contact-button">Send Message</button>
                {submitted && <p className="contact-success">✅ Thanks for reaching out!</p>}
            </form>
        </div>
    );
}

export default Contact;
