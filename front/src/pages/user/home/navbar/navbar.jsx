import React from 'react';
import './navbar.css';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    function handleNavigation(route) {
        navigate(`../home/${route}`);
    }


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
                <button onClick={() => handleNavigation('buy')}>Buy</button>
                <button onClick={() => handleNavigation('rent')}>Rent</button>
                <button onClick={() => handleNavigation('sell')}>Sell</button>
            </div>
        </div>
    );
};

export default NavBar;
