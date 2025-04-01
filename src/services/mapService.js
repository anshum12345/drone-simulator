import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';

export const searchLocation = async (query) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.GEOCODING}?format=json&q=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
};
