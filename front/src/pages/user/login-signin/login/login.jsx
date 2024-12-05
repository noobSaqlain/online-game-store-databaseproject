import './login.css';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { routingContext } from '../../../../App';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [userPassword, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const routingVars = useContext(routingContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (userName === 'agha@iba' && userPassword === 'admin') {
            console.log("admin seen")
            routingVars.toggleAdmin();
            routingVars.toggleAuthentication();
            localStorage.setItem('user_id', 'admin');
            navigate('/admin'); // Redirect to admin dashboard
            return;
        }
        console.log("user seen")
        try {
            const response = await axios.post('http://localhost:4000/login', {
                username: userName,
                password: userPassword
            });

            if (response.data.userAllowed) {
                routingVars.toggleAuthentication();
                localStorage.setItem('user_id', response.data.user_id);
                navigate('/home');
            } else {
                setError(response.data.message || "Invalid credentials");
            }
        } catch (err) {
            console.error("Error during login:", err);
            setError("An error occurred. Please try again.");
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
                        {/* Display error message if there's any */}
                        {error && <div className="error-message">{error}</div>}

                        <button className="loginSubmitButton" type="submit">Login</button>

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
