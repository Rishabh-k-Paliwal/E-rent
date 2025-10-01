import React, { useState } from 'react';
import LocationPicker from './LocationPicker';
import './Products.css';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      query: searchQuery,
      location: selectedLocation,
    });
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationPicker(false);
  };

  const clearLocation = () => {
    setSelectedLocation(null);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search for electronics (e.g., laptop, camera, drone)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          
          <button
            type="button"
            onClick={() => setShowLocationPicker(true)}
            className="btn-location"
            title="Filter by location"
          >
            📍 {selectedLocation ? 'Change Location' : 'Add Location'}
          </button>
        </div>

        {selectedLocation && (
          <div className="selected-location">
            <span>📍 Near: {selectedLocation.address || `${selectedLocation.lat.toFixed(2)}, ${selectedLocation.lng.toFixed(2)}`}</span>
            <span className="radius-info">Within {selectedLocation.radius || 50}km</span>
            <button type="button" onClick={clearLocation} className="btn-clear-location">
              ✕
            </button>
          </div>
        )}

        <button type="submit" className="btn-search">
          🔍 Search
        </button>
      </form>

      {showLocationPicker && (
        <LocationPicker
          onSelect={handleLocationSelect}
          onClose={() => setShowLocationPicker(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;