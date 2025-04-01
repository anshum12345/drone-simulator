export const API_ENDPOINTS = {
  GEOCODING: 'https://nominatim.openstreetmap.org/search',
  // Add other API endpoints if needed
};

// Keep your existing exports
export const DEFAULT_MAP_CENTER = [51.505, -0.09];
export const DEFAULT_ZOOM_LEVEL = 13;
export const DRONE_ICON_URL = 'https://cdn-icons-png.flaticon.com/512/1570/1570887.png';
export const PATH_COLOR = '#3498db';
export const PATH_OPACITY = 0.7;
export const PATH_WEIGHT = 3;
export const SIMULATION_SPEEDS = [
  { value: 1, label: '1x' },
  { value: 2, label: '2x' },
  { value: 3, label: '3x' },
  { value: 5, label: '5x' },
  { value: 10, label: '10x' }
];
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};