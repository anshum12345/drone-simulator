import React, { useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

// Default to New Delhi, India coordinates
const DEFAULT_POSITION = [28.6139, 77.2090];
const DEFAULT_ZOOM = 12;

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const SetIndiaBounds = () => {
  const map = useMap();
  
  useEffect(() => {
    // Set approximate bounds for India
    const indiaBounds = L.latLngBounds(
      L.latLng(6.0, 68.0),  // Southwest corner
      L.latLng(36.0, 98.0)  // Northeast corner
    );
    map.fitBounds(indiaBounds);
  }, [map]);

  return null;
};

const MapComponent = ({ position, path, isSimulating, droneIconUrl }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const pathRef = useRef(null);

  const createDroneIcon = useCallback(() => {
    return L.icon({
      iconUrl: droneIconUrl || 'https://cdn-icons-png.freepik.com/512/3864/3864206.png?uid=R184490539&ga=GA1.1.759550159.1729487841',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });
  }, [droneIconUrl]);

  useEffect(() => {
    if (markerRef.current && isSimulating && position) {
      markerRef.current.setLatLng(position);
    }
  }, [position, isSimulating]);

  useEffect(() => {
    if (pathRef.current && path.length > 0) {
      pathRef.current.setLatLngs(path);
    }
  }, [path]);

  return (
    <div className="map-container">
      <MapContainer
        center={position || DEFAULT_POSITION}
        zoom={DEFAULT_ZOOM}
        ref={mapRef}
        zoomControl={false}
      >
        <SetIndiaBounds />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && (
          <>
            <Marker
              position={position}
              icon={createDroneIcon()}
              ref={markerRef}
            >
              <Popup>
                <div>
                  <strong>Drone Position</strong><br />
                  Lat: {position[0].toFixed(6)}<br />
                  Lng: {position[1].toFixed(6)}
                </div>
              </Popup>
            </Marker>
            <RecenterAutomatically lat={position[0]} lng={position[1]} />
          </>
        )}
        <Polyline 
          positions={path} 
          color="blue" 
          weight={3}
          opacity={0.7}
          ref={pathRef}
        />
      </MapContainer>
    </div>
  );
};

export default React.memo(MapComponent);