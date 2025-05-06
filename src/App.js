// src/App.js
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './ProductList';
import PurchaseForm from './PurchaseForm';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import './App.css';

function App() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-brand">EcoTech</div>
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
        <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/form" onClick={closeMenu}>Purchase</Link>
          <Link to="/about" onClick={closeMenu}>Admin</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<PurchaseForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} EcoTech. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
