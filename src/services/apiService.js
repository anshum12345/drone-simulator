import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const loginAdmin = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const getSimulationHistory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/simulations`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch simulations';
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch users';
  }
};

export const saveSimulation = async (simulationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/simulations`, simulationData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to save simulation';
  }
};