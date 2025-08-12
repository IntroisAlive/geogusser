import React from 'react';
import { Trophy, RotateCcw, Star, Target, Award } from 'lucide-react';

interface FinalResultsProps {
  totalScore: number;
  maxPossibleScore: number;
  roundScores: number[];
  onPlayAgain: () => void;
}

export default function FinalResults({ totalScore, maxPossibleScore, roundScores, onPlayAgain }: FinalResultsProps) {
  const averageScore = Math.round(totalScore / roundScores.length);
  const accuracy = Math.round((totalScore / maxPossibleScore) * 100);
  const bestRound = Math.max(...roundScores);
  
  const getRating = (accuracy: number) => {
    if (accuracy >= 90) return { text: "Geography Master!", color: "text-yellow-500", stars: 5 };
    if (accuracy >= 80) return { text: "Excellent Explorer!", color: "text-blue-500", stars: 4 };
    if (accuracy >= 70) return { text: "Good Navigator!", color: "text-green-500", stars: 4 };
    if (accuracy >= 60) return { text: "Decent Traveler!", color: "text-orange-500", stars: 3 };
    if (accuracy >= 40) return { text: "Keep Exploring!", color: "text-purple-500", stars: 3 };
    return { text: "Adventure Awaits!", color: "text-gray-500", stars: 2 };
  };
  
  const rating = getRating(accuracy);
  
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
        <h1 className="text-3xl font-bold mb-2">Game Complete!</h1>
        <p className="text-lg opacity-90">Your geographic adventure ends here</p>
      </div>
      
      {/* Main Results */}
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-gray-800 mb-2">
            {totalScore.toLocaleString()}
          </div>
          <div className="text-gray-600 mb-4">Total Points</div>
          
          <div className={`text-2xl font-bold ${rating.color} mb-2`}>
            {rating.text}
          </div>
          
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${i < rating.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-700">Overall Accuracy</span>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">{accuracy}%</div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${accuracy}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Round Breakdown */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Round Breakdown
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
            {roundScores.map((score, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-sm text-gray-600 mb-1">Round {index + 1}</div>
                <div className="text-lg font-bold text-gray-800">{score.toLocaleString()}</div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {bestRound.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Best Round</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {averageScore.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
          </div>
        </div>
        
        {/* Play Again Button */}
        <button
          onClick={onPlayAgain}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    </div>
  );
}