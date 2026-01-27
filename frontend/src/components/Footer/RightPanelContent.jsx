import React, { useState } from 'react';

const RightPanelContent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [loading, setLoading] = useState(false);

    // Backend API URL (default to local if not set)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api/contact';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: 'Portfolio Contact Form' // Default subject
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Message sent successfully! I will get back to you soon.');
                setFormData({ name: '', email: '', message: '' });
            } else {
                // Try to extract the specific error message from the backend response
                const errorMessage = data.error?.message || data.message || 'Failed to send message';
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Submission Error:', error);
            alert(`Error: ${error.message}\n\n(Make sure the backend is running and your message is at least 10 characters long)`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="content-container custom-scrollbar">
            <div className="form-header">
                <h2>Let’s Build Something Impactful</h2>
                <p>Have an idea, a project, or an opportunity in mind?<br />Drop a message</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="your-name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your-email@domain.com"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        autoComplete="off"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        rows="3"
                        required
                    ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Sending...' : 'Connect'}
                </button>
            </form>
        </div>
    );
};

export default RightPanelContent;
