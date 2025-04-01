import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../../components/MapComponent/MapComponent';
import Controls from '../../components/Controls/Controls';
import DataInput from '../../components/DataInput/DataInput';
import DroneInfo from '../../components/DroneInfo/DroneInfo';
import { searchLocation } from '../../services/mapService';
import { formatTime, validateCoordinates } from '../../utils/helpers';
import './Home.css';

const Home = () => {
  const [path, setPath] = useState([]);
  const [position, setPosition] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notification, setNotification] = useState(null);
  const simulationRef = useRef(null);
  const navigate = useNavigate();

  // Calculate total time whenever path changes
  useEffect(() => {
    setTotalTime(path.length * 2); // 2 seconds per waypoint at 1x speed
  }, [path]);

  // Handle simulation
  useEffect(() => {
    if (isSimulating && path.length > 0) {
      clearInterval(simulationRef.current);
      
      const interval = 2000 / speed;
      let startTime = Date.now() - (currentTime * 1000);
      
      simulationRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progressIndex = Math.min(Math.floor(elapsed / (2 / speed)), path.length - 1);
        
        setCurrentIndex(progressIndex);
        setPosition(path[progressIndex]);
        setCurrentTime(Math.min(elapsed, totalTime));
        
        if (progressIndex >= path.length - 1) {
          setIsSimulating(false);
        }
      }, 100); // Update more frequently for smoother animation

      return () => clearInterval(simulationRef.current);
    }
  }, [isSimulating, path, speed, currentTime, totalTime]);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStart = useCallback(() => {
    if (path.length === 0) {
      showNotification('Please add at least one waypoint', 'error');
      return;
    }
    setIsSimulating(true);
    if (currentIndex >= path.length - 1) {
      setCurrentIndex(0);
      setPosition(path[0]);
      setCurrentTime(0);
    }
  }, [path, currentIndex]);

  const handlePause = useCallback(() => {
    setIsSimulating(false);
  }, []);

  const handleReset = useCallback(() => {
    setIsSimulating(false);
    setCurrentIndex(0);
    setPosition(path[0] || null);
    setCurrentTime(0);
  }, [path]);

  const handleSpeedChange = useCallback((newSpeed) => {
    setSpeed(newSpeed);
  }, []);

  const handleAddCoordinate = useCallback((coord) => {
    if (!validateCoordinates(coord[0], coord[1])) {
      showNotification('Invalid coordinates. Latitude must be between -90 and 90, Longitude between -180 and 180', 'error');
      return;
    }
    setPath(prev => [...prev, coord]);
    if (path.length === 0) {
      setPosition(coord);
    }
    showNotification('Waypoint added successfully', 'success');
  }, [path]);

  const handleSearchLocation = useCallback(async (query) => {
    try {
      const results = await searchLocation(query);
      if (results.length > 0) {
        const { lat, lon } = results[0];
        const newCoord = [parseFloat(lat), parseFloat(lon)];
        handleAddCoordinate(newCoord);
        showNotification('Location found and added', 'success');
      } else {
        showNotification('Location not found', 'error');
      }
    } catch (error) {
      showNotification('Error searching location', 'error');
      console.error('Search error:', error);
    }
  }, [handleAddCoordinate]);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target.result;
        let coords = [];
        
        if (file.name.endsWith('.json')) {
          const data = JSON.parse(content);
          coords = Array.isArray(data) ? data : data.path || [];
        } else if (file.name.endsWith('.csv')) {
          coords = content.split('\n')
            .filter(line => line.trim())
            .map(line => {
              const [lat, lng] = line.split(',').map(Number);
              return [lat, lng];
            })
            .filter(coord => !coord.some(isNaN));
        }
        
        if (coords.length > 0) {
          setPath(coords);
          setPosition(coords[0]);
          setCurrentIndex(0);
          setCurrentTime(0);
          showNotification(`${coords.length} waypoints loaded from file`, 'success');
        } else {
          showNotification('No valid coordinates found in file', 'error');
        }
      } catch (error) {
        showNotification('Error parsing file', 'error');
        console.error('File parse error:', error);
      }
    };
    reader.readAsText(file);
  }, []);

  const handleTimeSeek = useCallback((e) => {
    const seekTime = parseInt(e.target.value);
    const seekIndex = Math.min(Math.floor((seekTime / totalTime) * path.length), path.length - 1);
    
    setCurrentTime(seekTime);
    setCurrentIndex(seekIndex);
    setPosition(path[seekIndex]);
    setIsSimulating(false);
  }, [path, totalTime]);

  const handleAdminLogin = () => {
    navigate('/admin');
  };

  return (
    <div className="home-container">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <div className="map-section">
        <MapComponent
          position={position}
          path={path}
          isSimulating={isSimulating}
        />
      </div>
      
      <div className="controls-section">
        <Controls
          isSimulating={isSimulating}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          onUpload={handleFileUpload}
          speed={speed}
          onSpeedChange={handleSpeedChange}
          currentTime={currentTime}
          totalTime={totalTime}
          onTimeSeek={handleTimeSeek}
        />
      </div>
      
      <div className="data-section">
        <DataInput
          onAddCoordinate={handleAddCoordinate}
          onSearchLocation={handleSearchLocation}
        />
        <DroneInfo
          position={position}
          currentIndex={currentIndex}
          totalWaypoints={path.length}
          speed={speed}
        />
        {!isAdmin && (
          <button 
            className="admin-button"
            onClick={handleAdminLogin}
          >
            Admin Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;