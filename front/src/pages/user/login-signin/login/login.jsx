import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [userName, setUserName] = useState('');
    const [userPassword, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        axios.post('http://localhost:4000/login', {
            username: userName,
            password: userPassword
        }).then(res => {
            if (res.data.userAllowed) {
                onLogin(true); // Inform parent component that the user is allowed
                navigate('/home'); // Redirect to home page after successful login
            } else {
                setError(res.data.message || "Invalid credentials");
            }
        }).catch(err => {
            console.error("Error during login:", err);
            setError("An error occurred. Please try again.");
        });
    };

    function signUpRouteHandler() {
        navigate('/sign-up');
    }

    return (
        <div className='login-page'>
            <div className='login-form-wrapper'>
                <div className='login-page-title'>
                    <img
                        src={`${process.env.PUBLIC_URL}/image-removebg-preview.png`}
                        alt="Logo"
                        className='login-logo'
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='login-container'>
                        <h2>Welcome to the first online gaming store</h2>
                        <input
                            type="text"
                            placeholder='User name'
                            name='login-username'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <input
                            type="password"
                            name="login-password"
                            placeholder='Enter password'
                            value={userPassword}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Display error message if there's any */}
                        {error && <div className="error-message">{error}</div>}

                        <button className='loginSubmitButton' type='submit'>Login</button>

                        <button className='signUpRoute' onClick={signUpRouteHandler}>Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
