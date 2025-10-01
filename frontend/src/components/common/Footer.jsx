import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-logo">
              <span className="logo-icon">⚡</span>
              ElectroRent
            </h3>
            <p className="footer-description">
              Your trusted platform for renting electronics. Quality products,
              affordable prices, hassle-free experience.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Browse Products</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h4>Categories</h4>
            <ul className="footer-links">
              <li><Link to="/?category=laptops">Laptops</Link></li>
              <li><Link to="/?category=cameras">Cameras</Link></li>
              <li><Link to="/?category=audio">Audio Equipment</Link></li>
              <li><Link to="/?category=gaming">Gaming</Link></li>
              <li><Link to="/?category=smartphones">Smartphones</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/refund">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} ElectroRent. All rights reserved.</p>
          <p>Capstone 103</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;