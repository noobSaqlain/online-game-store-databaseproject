import React, { useState } from 'react';
import './signin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const res = await axios.post('http://localhost:4000/sign-up', formData);
            if (res.data.success) {
                alert(`Your account has been created. Your User ID is ${res.data.userId}`);
                navigate('/login');
            } else {
                setError(res.data.message || 'Failed to sign up');
            }
        } catch (error) {
            console.error('Sign-up failed:', error.message);
            setError('An error occurred during sign-up.');
        }
    };

    return (
        <div className="signin-page">
            <div className="signin-form-wrapper">
                <h2 className="signin-page-title">Create Your Account</h2>
                <form className="signin-form" onSubmit={handleSignUp}>
                    <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} required />
                    <input type="text" placeholder="Home Address" name="address" value={formData.address} onChange={handleChange} required />
                    <input type="text" placeholder="City" name="city" value={formData.city} onChange={handleChange} required />
                    <input type="tel" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
                    <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signin;
