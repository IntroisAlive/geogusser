import React from 'react';
import { Location } from '../types/game';

interface LocationImageProps {
  location: Location;
  className?: string;
}

export default function LocationImage({ location, className = '' }: LocationImageProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg shadow-lg bg-gray-200 ${className}`}>
      <img
        src={location.imageUrl}
        alt="Guess this location"
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
}