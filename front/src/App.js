import Login from './pages/user/login-signin/login/login.jsx';
import Signin from './pages/user/login-signin/signin/signin.jsx';
import Home from './pages/user/home/home.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BuyPage from './pages/user/home/homepage/buy/buy.jsx';
import RentPage from './pages/user/home/homepage/rent/rent.jsx';
import SellPage from './pages/user/home/homepage/sell/sell.jsx';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='sign-up' element={<Signin />} />
        <Route path='home' element={<Home />} />
        <Route path='home/buy' element={<BuyPage />} />
        <Route path='home/rent' element={<RentPage />} />
        <Route path='home/sell' element={<SellPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
