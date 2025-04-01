import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiMapPin } from 'react-icons/fi';
import './DataInput.css';

const DataInput = ({ onAddCoordinate, onSearchLocation }) => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const saveSearch = (query) => {
    const updatedSearches = [
      query,
      ...recentSearches.filter(item => item !== query).slice(0, 4)
    ];
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleAddCoordinate = () => {
    if (lat && lng) {
      onAddCoordinate([parseFloat(lat), parseFloat(lng)]);
      setLat('');
      setLng('');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchLocation(searchQuery);
      saveSearch(searchQuery);
      setSearchQuery('');
    }
  };

  const handleRecentSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="data-input-container">
      <div className="input-section">
        <h3><FiMapPin /> Add Coordinates</h3>
        <div className="coordinate-input">
          <input
            type="number"
            placeholder="Latitude (-90 to 90)"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            step="0.000001"
            min="-90"
            max="90"
          />
          <input
            type="number"
            placeholder="Longitude (-180 to 180)"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            step="0.000001"
            min="-180"
            max="180"
          />
          <button 
            onClick={handleAddCoordinate}
            className="add-button"
            disabled={!lat || !lng}
          >
            <FiPlus /> Add
          </button>
        </div>
      </div>
      
      <div className="search-section">
        <h3><FiSearch /> Search Location</h3>
        <form onSubmit={handleSearch} className="search-input">
          <input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="search-button"
            disabled={!searchQuery.trim()}
          >
            Search
          </button>
        </form>
        
        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <h4>Recent Searches:</h4>
            <ul>
              {recentSearches.map((search, index) => (
                <li key={index} onClick={() => handleRecentSearch(search)}>
                  {search}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(DataInput);