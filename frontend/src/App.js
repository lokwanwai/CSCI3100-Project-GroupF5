import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ShoppingCart from './pages/ShoppingCart';
import CheckOut from './pages/CheckOut';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={< ShoppingCart />} />

          <Route path="/checkout" element={<CheckOut />} />
          {/* <Route path="/admin" element={<Admin />} /> */}
          {/* Add more routes for other pages */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;