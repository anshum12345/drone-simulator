import React from 'react';
import { FiNavigation, FiClock, FiZap, FiMap } from 'react-icons/fi';
import './DroneInfo.css';

const DroneInfo = ({ position, currentIndex, totalWaypoints, speed, path }) => {
  const calculateDistance = (path, index) => {
    if (!path || index === 0 || index >= path.length) return 0;
    return haversineDistance(path[index - 1], path[index]);
  };

  const haversineDistance = (coord1, coord2) => {
    const R = 6371; // Earth radius in km
    const dLat = toRad(coord2[0] - coord1[0]);
    const dLon = toRad(coord2[1] - coord1[1]);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coord1[0])) * Math.cos(toRad(coord2[0])) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2); // Distance in km
  };

  const toRad = (value) => {
    return value * Math.PI / 180;
  };

  return (
    <div className="drone-info-container">
      <h3><FiNavigation /> Drone Information</h3>
      
      <div className="info-grid">
        <div className="info-item">
          <span className="info-label"><FiMap /> Current Position:</span>
          <span className="info-value">
            {position ? `${position[0].toFixed(6)}, ${position[1].toFixed(6)}` : 'N/A'}
          </span>
        </div>
        
        <div className="info-item">
          <span className="info-label"><FiMap /> Waypoint:</span>
          <span className="info-value">
            {currentIndex + 1} of {totalWaypoints}
          </span>
        </div>
        
        <div className="info-item">
          <span className="info-label"><FiZap /> Speed:</span>
          <span className="info-value">{speed}x</span>
        </div>
        
        {position && path && currentIndex > 0 && (
          <div className="info-item">
            <span className="info-label"><FiClock /> Last Segment:</span>
            <span className="info-value">
              {calculateDistance(path, currentIndex)} km
            </span>
          </div>
        )}
      </div>
      
      <div className="progress-container">
        <div 
          className="progress-bar"
          style={{ width: `${totalWaypoints ? (currentIndex / totalWaypoints) * 100 : 0}%` }}
        ></div>
        <span className="progress-text">
          {totalWaypoints ? Math.round((currentIndex / totalWaypoints) * 100) : 0}% Complete
        </span>
      </div>
    </div>
  );
};

export default React.memo(DroneInfo);
