import React from 'react';
import { Trophy, Target, MapPin } from 'lucide-react';

interface ScoreDisplayProps {
  currentScore: number;
  totalScore: number;
  round: number;
  totalRounds: number;
  className?: string;
}

export default function ScoreDisplay({ currentScore, totalScore, round, totalRounds, className = '' }: ScoreDisplayProps) {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Score
        </h2>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Target className="w-4 h-4" />
          Round {round}/{totalRounds}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Score:</span>
          <span className="text-2xl font-bold text-blue-600">{totalScore.toLocaleString()}</span>
        </div>
        
        {currentScore > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">This Round:</span>
            <span className="text-lg font-semibold text-green-600">+{currentScore.toLocaleString()}</span>
          </div>
        )}
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(round / totalRounds) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}