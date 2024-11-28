import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [userName, setUserName] = useState('');
    const [userPassword, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);  // Added loading state
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);  // Set loading to true

        // Hardcoded admin check
        if (userName === 'agha@iba' && userPassword === 'admin') {
            onLogin(true); // Admin login
            navigate('/admin');
            setLoading(false);  // Reset loading state
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/login', {
                username: userName,
                password: userPassword
            });

            if (response.data.userAllowed) {
                onLogin(false); // Regular user login
                navigate('/home');
            } else {
                setError(response.data.message || "Invalid credentials");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);  // Reset loading state after request completes
        }
    };

    const signUpRouteHandler = () => {
        navigate('/sign-up');
    };

    return (
        <div className="login-page">
            <div className="login-form-wrapper">
                <div className="login-page-title">
                    <img
                        src={`${process.env.PUBLIC_URL}/image-removebg-preview.png`}
                        alt="Logo"
                        className="login-logo"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="login-container">
                        <h2>Welcome to the first online gaming store</h2>
                        <input
                            type="text"
                            placeholder="User name"
                            name="login-username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <input
                            type="password"
                            name="login-password"
                            placeholder="Enter password"
                            value={userPassword}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <div className="error-message">{error}</div>}
                        <button className="loginSubmitButton" type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                        <button
                            className="signUpRoute"
                            type="button"
                            onClick={signUpRouteHandler}
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
