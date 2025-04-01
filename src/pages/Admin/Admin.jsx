import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogIn, FiLock, FiUser } from 'react-icons/fi';
import './Admin.css';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (username === 'admin' && password === 'admin123') {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Drone Simulator Admin</h2>
          <p>Enter your credentials to access the admin panel</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-group">
            <label htmlFor="username">
              <FiUser className="input-icon" />
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter admin username"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">
              <FiLock className="input-icon" />
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : (
              <>
                <FiLogIn /> Login
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;