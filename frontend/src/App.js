import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ChangePassword from './pages/changePassword/changePassword';
import ChangeUserName from './pages/changeUserName/changeUserName';
import Login from './pages/Login';
import Register from './pages/Register';
import ShoppingCart from './pages/ShoppingCart';
import Search from './pages/Search';
import OrderHistory from './pages/OrderHistory';
import CheckOut from './pages/CheckOut';
import Admin from './pages/Admin';
import FAQ from './pages/FAQ';
import AboutUs from './pages/AboutUs';
import Shipping from './pages/Shipping';
import Profile from './pages/UserProfile';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail_new';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/order" element={<OrderHistory />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/editname" element={<ChangeUserName />} />
          <Route path="/editpw" element={<ChangePassword />} />
          {/* Add more routes for other pages */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;