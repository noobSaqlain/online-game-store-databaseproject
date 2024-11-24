import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/user/login-signin/login/login.jsx';
import Signin from './pages/user/login-signin/signin/signin.jsx';
import Home from './pages/user/home/home.jsx';
import BuyPage from './pages/user/home/homepage/buy/buy.jsx';
import RentPage from './pages/user/home/homepage/rent/rent.jsx';
import SellPage from './pages/user/home/homepage/sell/sell.jsx';
import ProtectRoute from './util/protectroute.jsx';


function App() {
  const [userAllowed, setUserAllowed] = useState(localStorage.getItem("isAuthenticated") === "true"); // stores boolean value

  const handleLogin = (status) => {
    localStorage.setItem("isAuthenticated", status ? "true" : "false");
    setUserAllowed(status);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/' element={<Login onLogin={handleLogin} />} />
        <Route path='/sign-up' element={<Signin />} />

        {/* Protected routes */}
        <Route element={<ProtectRoute isAuthenticated={userAllowed} />}>
          <Route path='/home' element={<Home />} />
          <Route path='/home/buy' element={<BuyPage />} />
          <Route path='/home/rent' element={<RentPage />} />
          <Route path='/home/sell' element={<SellPage />} />
        </Route>

        {/* Fallback route */}
        <Route path='*' element={<h1>Error: 404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
