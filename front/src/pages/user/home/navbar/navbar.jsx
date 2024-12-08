import React, { useContext } from 'react';
import { routingContext } from '../../../../App';
import './navbar.css';
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSignOutAlt, FaUserShield, FaHandHoldingUsd, FaHandshake, FaGamepad } from 'react-icons/fa'; // Importing icons


const NavBar = ({ isAdmin }) => {
    const navigate = useNavigate();
    const routingVars = useContext(routingContext);

    function handleNavigation(route) {
        // Navigate to absolute paths
        navigate(route === 'admin' ? '/admin' : `/home/${route}`);
    }
    function handleGamesPage() {
        navigate('/admin/games');
    }

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem("user_id");

        if (routingVars.isAdmin) {
            routingVars.toggleAdmin();
        }
        routingVars.toggleAuthentication();

        navigate('/');
    };

    var logOutStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '10px',
        paddingRight: '10px',
        fontSize: '16px',
        border: 'none',
        width: 'auto',

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
                {routingVars.isAdmin && (
                    <>
                        <button onClick={() => handleNavigation('admin')}><FaUserShield />Admin</button>
                        <button onClick={() => handleGamesPage()}><FaGamepad />Games</button>
                    </>
                )}
                <button onClick={() => handleNavigation('buy')}> <FaShoppingCart /> Buy</button>
                <button onClick={() => handleNavigation('rent')}><FaHandshake /> Rent</button>
                <button onClick={() => handleNavigation('sell')}><FaHandHoldingUsd />Sell</button>
                <button style={logOutStyle} onClick={() => handleLogout()}><FaSignOutAlt />Log Out</button>
            </div>
        </div>
    );
};

export default NavBar;
