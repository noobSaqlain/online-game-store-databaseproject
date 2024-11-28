import React from 'react';
import './navbar.css';
import { useNavigate } from "react-router-dom";

const NavBar = ({ isAdmin }) => {
    const navigate = useNavigate();

    function handleNavigation(route) {
        navigate(`../home/${route}`);
    }
    function handleLogout() {
        console.log("logout clicked");
        window.localStorage.setItem("isAuthenticated", "false");
        window.location.reload();
        //navigate('/'); ///is not working maybe because of updation of the global variable
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
