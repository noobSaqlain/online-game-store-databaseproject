import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/user/login-signin/login/login.jsx';
import Signin from './pages/user/login-signin/signin/signin.jsx';
import Home from './pages/user/home/home.jsx';
import BuyPage from './pages/user/home/homepage/buy/buy.jsx';
import RentPage from './pages/user/home/homepage/rent/rent.jsx';
import SellPage from './pages/user/home/homepage/sell/sell.jsx';
import Payment from './pages/user/home/payment/payment.jsx';
import AdminDashboard from './pages/admin/admindashboard.jsx';
import NotFound from './util/notfound.jsx';
import ProtectRoute from './util/protectroute.jsx';
import Games from './pages/admin/games/games.jsx';


export const routingContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true' || false;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem('isAdmin');
    return storedAdmin === 'true' || false;
  });


  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('isAdmin', isAdmin);
    console.log(localStorage.getItem('isAdmin'))
    console.log(localStorage.getItem('isAuthenticated'))
  }, [isAuthenticated, isAdmin]);

  const toggleAdmin = () => setIsAdmin(!isAdmin);
  const toggleAuthentication = () => setIsAuthenticated(!isAuthenticated);

  const handleLogin = (admin) => {
    setIsAuthenticated(true);
    setIsAdmin(admin);
  };

  const publicRoutes = (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signin />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path='*' element={<Navigate to={"/login"} />}></Route>
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
      <Route path="*" element={<Navigate to={NotFound} />} />
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
      <Route path="/admin/games" element={<Games />}></Route>
      <Route path="*" element={<Navigate to={NotFound} />} />
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
