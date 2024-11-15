import './login.css';
import { useState } from 'react';
import axios from 'axios';  // Rename to lowercase 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [userName, setUserName] = useState('');
    const [userPassword, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Username:', userName);
        console.log('Password:', userPassword);

        // Send with matching keys expected by backend
        axios.post('http://localhost:4000/login', {
            username: userName,
            password: userPassword
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

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
                        {/* user name input */}
                        <input
                            type="password"
                            name="login-password"
                            placeholder='Enter password'
                            value={userPassword}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* user password input */}
                        <button className='loginSubmitButton' type='submit'>Login</button>

                        <button className='signUpRoute' onClick={signUpRouteHandler}>sign up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
