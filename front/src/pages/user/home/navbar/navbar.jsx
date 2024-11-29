import React, { useContext } from 'react';
import { routingContext } from '../../../../App';
import './navbar.css';
import { useNavigate } from "react-router-dom";

const NavBar = ({ isAdmin }) => {
    const navigate = useNavigate();
    const routingVars = useContext(routingContext);

    function handleNavigation(route) {
        navigate(`../home/${route}`);
    }

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('isAdmin');
        routingVars.toggleAuthentication();
        routingVars.toggleAdmin();
        navigate('/'); ///is not working maybe because of updation of the global variable
    };



    return (
        <div className="navbar">
            <div className="side-logo">
                <img
                    src={`${process.env.PUBLIC_URL}/image-removebg-preview.png`}
                    alt="Logo"
                    className="side-login-logo"
                />
            </div>
            <div className="buttons">
                {isAdmin && (
                    <>
                        <button>Users</button>
                        <button>games</button>
                        <button>transactions</button>
                    </>
                )}
                <button onClick={() => handleNavigation('buy')}>Buy</button>
                <button onClick={() => handleNavigation('rent')}>Rent</button>
                <button onClick={() => handleNavigation('sell')}>Sell</button>
                <button onClick={() => handleLogout()}>Log Out</button>
            </div>
        </div>
    );
};

export default NavBar;
