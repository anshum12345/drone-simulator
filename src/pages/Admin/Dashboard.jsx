import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiUsers, FiSettings, FiActivity } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analytics');
  const [simulationHistory, setSimulationHistory] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // In a real app, fetch this data from an API
    setSimulationHistory([
      { id: 1, date: '2023-05-15', duration: '2:30', waypoints: 5 },
      { id: 2, date: '2023-05-14', duration: '1:45', waypoints: 3 },
      { id: 3, date: '2023-05-13', duration: '4:15', waypoints: 8 }
    ]);
    
    setUsers([
      { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
      { id: 2, name: 'Test User', email: 'test@example.com', role: 'user' }
    ]);
  }, []);

  const handleLogout = () => {
    // In a real app, clear authentication tokens
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <FiActivity /> Analytics
          </button>
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FiUsers /> User Management
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <FiSettings /> Settings
          </button>
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </div>
      
      <div className="main-content">
        {activeTab === 'analytics' && (
          <div className="analytics-tab">
            <h2>Simulation Analytics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Simulations</h3>
                <p>{simulationHistory.length}</p>
              </div>
              <div className="stat-card">
                <h3>Average Duration</h3>
                <p>2:45</p>
              </div>
              <div className="stat-card">
                <h3>Average Waypoints</h3>
                <p>5.3</p>
              </div>
            </div>
            
            <h3>Recent Simulations</h3>
            <table className="simulation-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Waypoints</th>
                </tr>
              </thead>
              <tbody>
                {simulationHistory.map(sim => (
                  <tr key={sim.id}>
                    <td>{sim.date}</td>
                    <td>{sim.duration}</td>
                    <td>{sim.waypoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="users-tab">
            <h2>User Management</h2>
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button className="edit-button">Edit</button>
                      <button className="delete-button">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="settings-tab">
            <h2>Application Settings</h2>
            <form className="settings-form">
              <div className="form-group">
                <label>Default Map Provider</label>
                <select>
                  <option>OpenStreetMap</option>
                  <option>Google Maps</option>
                  <option>Mapbox</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Default Simulation Speed</label>
                <input type="number" min="1" max="10" defaultValue="1" />
              </div>
              
              <div className="form-group">
                <label>Maximum Waypoints</label>
                <input type="number" min="10" max="1000" defaultValue="100" />
              </div>
              
              <button type="submit" className="save-button">
                Save Settings
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;