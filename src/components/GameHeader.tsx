import React from 'react';
import { Globe, Home } from 'lucide-react';

interface GameHeaderProps {
  onHome?: () => void;
  showHomeButton?: boolean;
}

export default function GameHeader({ onHome, showHomeButton = false }: GameHeaderProps) {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Mini Geo Explorer</h1>
              <p className="text-sm text-gray-600">Test your geography knowledge</p>
            </div>
          </div>
          
          {showHomeButton && (
            <button
              onClick={onHome}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}