import React, { useState, createContext, useEffect } from 'react';
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



export const routingContext = createContext({
  isAuthenticated: false,
  isAdmin: false,
  toggleAdmin: () => { },
  toggleAuthentication: () => { },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Retrieve authentication state from localStorage
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true'; // Parse boolean value
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    // Retrieve admin state from localStorage
    const storedAdmin = localStorage.getItem('isAdmin');
    return storedAdmin === 'true'; // Parse boolean value
  });

  // Synchronize state with localStorage
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('isAdmin', isAdmin);
  }, [isAuthenticated, isAdmin]);

  const toggleAdmin = () => setIsAdmin((prev) => !prev);
  const toggleAuthentication = () => setIsAuthenticated((prev) => !prev);

  const handleLogin = (admin) => {
    setIsAuthenticated(true);
    setIsAdmin(admin);
  };

  const publicRoutes = (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signin />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </>
  );

  const userRoutes = (
    <>
      <Route path="/admin" element={<Navigate to="/home" />} />
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
      <routingContext.Provider value={{ isAuthenticated, isAdmin, toggleAdmin, toggleAuthentication }}>
        <Routes>
          {!isAuthenticated ? (
            publicRoutes
          ) : isAdmin ? (
            <Route element={<ProtectRoute isAuthenticated={isAuthenticated} />}>
              {adminRoutes}
            </Route>
          ) : (
            <Route element={<ProtectRoute isAuthenticated={isAuthenticated} />}>
              {userRoutes}
            </Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </routingContext.Provider>
    </BrowserRouter>
  );
}

export default App;
