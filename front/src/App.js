import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/user/login-signin/login/login.jsx';
import Signin from './pages/user/login-signin/signin/signin.jsx';
import Home from './pages/user/home/home.jsx';
import BuyPage from './pages/user/home/homepage/buy/buy.jsx';
import RentPage from './pages/user/home/homepage/rent/rent.jsx';
import SellPage from './pages/user/home/homepage/sell/sell.jsx';
import Payment from './pages/user/home/payment.jsx';
import AdminDashboard from './pages/admin/admindashboard.jsx';
import NotFound from './util/notfound.jsx';
import ProtectRoute from './util/protectroute.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (admin) => {
    setIsAuthenticated(true);
    setIsAdmin(admin);
  };

  const publicRoutes = (
    <>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/sign-up" element={<Signin />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </>
  );

  const userRoutes = (
    <>
      <Route path="/home" element={<Home />} />
      <Route path="/home/buy" element={<BuyPage />} />
      <Route path="/home/rent" element={<RentPage />} />
      <Route path="/home/sell" element={<SellPage />} />
      <Route path="/home/payment" element={<Payment />} />
      <Route path="/admin" element={<Navigate to="/home" />} />
      <Route path="/login" element={<Navigate to="/home" />} />
      <Route path="/sign-up" element={<Navigate to="/home" />} />
      <Route path="/" element={<Navigate to="/home" />} />
    </>
  );

  const adminRoutes = (
    <>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/buy" element={<BuyPage />} />
      <Route path="/home/rent" element={<RentPage />} />
      <Route path="/home/sell" element={<SellPage />} />
      <Route path="/home/payment" element={<Payment />} />
      <Route path="/login" element={<Navigate to="/home" />} />
      <Route path="/sign-up" element={<Navigate to="/home" />} />
      <Route path="/" element={<Navigate to="/home" />} />
    </>
  );

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          publicRoutes
        ) : (
          <Route element={<ProtectRoute isAuthenticated={isAuthenticated} />}>
            {isAdmin ? adminRoutes : userRoutes},
          </Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
