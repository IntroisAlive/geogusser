import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import { LatLngBounds, Icon, Map as LeafletMap } from 'leaflet';
import { Location } from '../types/game';

// Fix for default markers in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = new Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
  iconSize: [25, 41],
  shadowSize: [41, 41],
});

// Custom icons
const guessIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 41l-5.4-9.7c-3.4-6.1-3.4-13.6 0-19.7C9.8 5.5 15.2 5.5 18.9 11.6c3.4 6.1 3.4 13.6 0 19.7L12.5 41z" fill="#3B82F6" stroke="#1E40AF" stroke-width="2"/>
      <circle cx="12.5" cy="12.5" r="6" fill="white"/>
      <circle cx="12.5" cy="12.5" r="3" fill="#3B82F6"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const actualIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 41l-5.4-9.7c-3.4-6.1-3.4-13.6 0-19.7C9.8 5.5 15.2 5.5 18.9 11.6c3.4 6.1 3.4 13.6 0 19.7L12.5 41z" fill="#10B981" stroke="#047857" stroke-width="2"/>
      <circle cx="12.5" cy="12.5" r="6" fill="white"/>
      <circle cx="12.5" cy="12.5" r="3" fill="#10B981"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface GameMapProps {
  guessLocation: { lat: number; lng: number } | null;
  actualLocation: Location | null;
  showActual: boolean;
  onMapClick: (lat: number, lng: number) => void;
  disabled: boolean;
}

function MapClickHandler({ onMapClick, disabled }: { onMapClick: (lat: number, lng: number) => void; disabled: boolean }) {
  useMapEvents({
    click: (e) => {
      if (!disabled) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

export default function GameMap({ guessLocation, actualLocation, showActual, onMapClick, disabled }: GameMapProps) {
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (showActual && actualLocation && guessLocation && mapRef.current) {
      // Fit map to show both markers
      const bounds = new LatLngBounds(
        [actualLocation.lat, actualLocation.lng],
        [guessLocation.lat, guessLocation.lng]
      );
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [showActual, actualLocation, guessLocation]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onMapClick={onMapClick} disabled={disabled} />
        
        {guessLocation && (
          <Marker position={[guessLocation.lat, guessLocation.lng]} icon={guessIcon}>
            <Popup>Your Guess</Popup>
          </Marker>
        )}
        
        {showActual && actualLocation && (
          <Marker position={[actualLocation.lat, actualLocation.lng]} icon={actualIcon}>
            <Popup>
              <div className="text-center">
                <strong>{actualLocation.name}</strong>
                <br />
                {actualLocation.country}
              </div>
            </Popup>
          </Marker>
        )}
        
        {showActual && guessLocation && actualLocation && (
          <Polyline
            positions={[
              [guessLocation.lat, guessLocation.lng],
              [actualLocation.lat, actualLocation.lng]
            ]}
            color="#F97316"
            weight={3}
            opacity={0.8}
            dashArray="10, 10"
          />
        )}
      </MapContainer>
      
      {disabled && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-20 flex items-center justify-center pointer-events-none">
          <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
            <span className="text-gray-700 font-medium">Analyzing your guess...</span>
          </div>
        </div>
      )}
    </div>
  );
}