import React from 'react';
import './Loader.css';

const Loader = ({ size = 'medium', fullScreen = false, message = 'Loading...' }) => {
  const sizeClass = `loader-${size}`;

  if (fullScreen) {
    return (
      <div className="loader-fullscreen">
        <div className="loader-content">
          <div className={`loader ${sizeClass}`}></div>
          <p className="loader-message">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="loader-container">
      <div className={`loader ${sizeClass}`}></div>
      {message && <p className="loader-message">{message}</p>}
    </div>
  );
};

export default Loader;