import React from 'react';
import { MapPin, Target, Award } from 'lucide-react';
import { GuessResult, Location } from '../types/game';
import { formatDistance, getPerformanceMessage } from '../utils/gameUtils';

interface GameResultProps {
  result: GuessResult;
  location: Location;
  onNextRound: () => void;
  isLastRound: boolean;
}

export default function GameResult({ result, location, onNextRound, isLastRound }: GameResultProps) {
  const accuracy = Math.round((result.score / result.maxScore) * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Round Complete!</h3>
        <p className="text-gray-600">{getPerformanceMessage(result.distance)}</p>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-gray-800">Actual Location</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{location.name}</p>
          <p className="text-gray-600">{location.country}</p>
          <p className="text-sm text-gray-500 mt-1">{location.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500 mb-1">
              {formatDistance(result.distance)}
            </div>
            <div className="text-sm text-gray-600">Distance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {result.score.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Points</div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Accuracy</span>
            <span className="text-sm font-bold text-blue-600">{accuracy}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-700"
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </div>
      </div>
      
      <button
        onClick={onNextRound}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {isLastRound ? (
          <>
            <Award className="w-5 h-5" />
            View Final Results
          </>
        ) : (
          <>
            <Target className="w-5 h-5" />
            Next Round
          </>
        )}
      </button>
    </div>
  );
}