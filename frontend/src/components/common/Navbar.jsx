import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⚡</span>
          ElectroRent
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link to="/">Browse</Link>
          </li>
          
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              {(user?.role === 'owner' || user?.role === 'admin') && (
                <li>
                  <Link to="/add-product">List Item</Link>
                </li>
              )}
              <li>
                <span className="user-name">Hi, {user?.name}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="btn-nav-login">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn-nav-register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;