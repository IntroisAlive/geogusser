import React from 'react';
import { Play, Globe, Target, Trophy, Map } from 'lucide-react';

interface WelcomeScreenProps {
  onStartGame: () => void;
}

export default function WelcomeScreen({ onStartGame }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Mini Geo Explorer</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Test your geography knowledge by identifying famous landmarks from around the world. 
            Click on the map where you think each location is and earn points based on accuracy!
          </p>
        </div>
        
        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Precision Scoring</h3>
            <p className="text-gray-600">
              Get up to 5,000 points per round based on how close your guess is to the actual location.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Map className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Interactive Maps</h3>
            <p className="text-gray-600">
              Click anywhere on the world map to make your guess. See the distance and connection to the actual location.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">5 Round Challenge</h3>
            <p className="text-gray-600">
              Play through 5 exciting rounds featuring iconic landmarks from every continent.
            </p>
          </div>
        </div>
        
        {/* Game Rules */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How to Play</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Game Rules:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                  <span>Look at the landmark image and try to identify the location</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                  <span>Click on the world map where you think it's located</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                  <span>See your score based on how close you were</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                  <span>Complete 5 rounds and get your final rating</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Scoring System:</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Perfect (≤1km):</span>
                  <span className="font-semibold text-green-600">5,000 pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Excellent (≤10km):</span>
                  <span className="font-semibold text-blue-600">4,500 pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Great (≤50km):</span>
                  <span className="font-semibold text-purple-600">4,000 pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Good (≤100km):</span>
                  <span className="font-semibold text-yellow-600">3,000 pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Far (&gt;100km):</span>
                  <span className="font-semibold text-orange-600">250-2,000 pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={onStartGame}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-3 mx-auto text-xl"
          >
            <Play className="w-6 h-6" />
            Start Adventure
          </button>
        </div>
      </div>
    </div>
  );
}