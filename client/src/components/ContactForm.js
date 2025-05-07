import React, { useState } from 'react';

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            setResponseMessage(data.message);
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setResponseMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div>
            <h2>Contact Us</h2>
            {responseMessage && <p>{responseMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label><br />
                    <input name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label><br />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Message:</label><br />
                    <textarea name="message" value={formData.message} onChange={handleChange} required />
                </div>
                <br />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default ContactForm;
