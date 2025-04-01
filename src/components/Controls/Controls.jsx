import React from 'react';
import { FaPlay, FaPause, FaRedo, FaUpload, FaFastForward, FaFastBackward } from 'react-icons/fa';
import './Controls.css';

const Controls = ({
  isSimulating,
  onStart,
  onPause,
  onReset,
  onUpload,
  speed,
  onSpeedChange,
  currentTime,
  totalTime,
  onTimeSeek
}) => {
  const handleSpeedIncrease = () => {
    if (speed < 10) onSpeedChange(speed + 1);
  };

  const handleSpeedDecrease = () => {
    if (speed > 1) onSpeedChange(speed - 1);
  };

  return (
    <div className="controls-container">
      <div className="control-buttons">
        {!isSimulating ? (
          <button onClick={onStart} className="control-button start">
            <FaPlay /> Start
          </button>
        ) : (
          <button onClick={onPause} className="control-button pause">
            <FaPause /> Pause
          </button>
        )}
        <button onClick={onReset} className="control-button reset">
          <FaRedo /> Reset
        </button>
        <div className="file-upload">
          <label htmlFor="file-upload" className="control-button upload">
            <FaUpload /> Upload Path
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".json,.csv"
            onChange={onUpload}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      
      <div className="speed-control">
        <button onClick={handleSpeedDecrease} className="speed-button">
          <FaFastBackward />
        </button>
        <span className="speed-value">{speed}x</span>
        <button onClick={handleSpeedIncrease} className="speed-button">
          <FaFastForward />
        </button>
      </div>
      
      <div className="time-control">
        <div className="time-display">
          {formatTime(currentTime)} / {formatTime(totalTime)}
        </div>
        <input
          type="range"
          min="0"
          max={totalTime || 100}
          value={currentTime}
          onChange={onTimeSeek}
          className="time-slider"
        />
      </div>
    </div>
  );
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default React.memo(Controls);