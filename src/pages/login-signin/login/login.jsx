import './login.css';

function login() {
    return (
        <div className='login-page'>
            <div className='login-form-wrapper'>
                <div className='login-page-title'>
                    <h1>Game Store logo</h1>
                </div>
                <form action="post">
                    <div className='login-container'>
                        <h2>Welcome to the first online gaming store</h2>
                        <input type="text" placeholder='User name' name='login-username' />
                        <input type="password" name="login-password" placeholder='Enter password' />
                        <button type='submit'>Login</button>
                    </div>
                </form>
            </div>
        </div>


    );
}


export default login;