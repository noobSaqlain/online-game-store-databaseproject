import React from 'react';
import './signin.css';

function signin() {
    return (
        <div className="signin-page">
            <div className="signin-form-wrapper">
                <h2 className="signin-page-title">Create Your Account</h2>
                <form className="signin-form">
                    <input type="text" placeholder="First Name" name="firstName" required />
                    <input type="text" placeholder="Last Name" name="lastName" required />
                    <input type="text" placeholder="User ID" name="userId" required />
                    <input type="email" placeholder="Email Address" name="email" required />
                    <input type="text" placeholder="Home Address" name="address" required />
                    <input type="text" placeholder="City" name="city" required />
                    <input type="tel" placeholder="Phone Number" name="phone" required />
                    <input type="password" placeholder="Password" name="password" required />
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" required />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default signin;
