export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const validateCoordinates = (lat, lng) => {
  return (
    lat >= -90 && lat <= 90 &&
    lng >= -180 && lng <= 180 &&
    !isNaN(lat) && !isNaN(lng)
  );
};

export const calculateDistance = (coord1, coord2) => {
  if (!coord1 || !coord2) return 0;
  
  const R = 6371; // Earth radius in km
  const dLat = toRad(coord2[0] - coord1[0]);
  const dLon = toRad(coord2[1] - coord1[1]);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(coord1[0])) * Math.cos(toRad(coord2[0])) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (R * c).toFixed(2); // Distance in km
};

const toRad = (value) => {
  return value * Math.PI / 180;
};

export const parseFileContent = (content, fileType) => {
  try {
    if (fileType === 'json') {
      const data = JSON.parse(content);
      return Array.isArray(data) ? data : data.path || [];
    } else if (fileType === 'csv') {
      return content.split('\n')
        .filter(line => line.trim())
        .map(line => {
          const [lat, lng] = line.split(',').map(Number);
          return [lat, lng];
        })
        .filter(coord => !coord.some(isNaN));
    }
    return [];
  } catch (error) {
    console.error('Error parsing file:', error);
    return [];
  }
};