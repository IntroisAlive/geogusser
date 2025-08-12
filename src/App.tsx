import React, { useState, useCallback } from 'react';
import 'leaflet/dist/leaflet.css';
import { GameState, Location, GuessResult } from './types/game';
import { gameLocations } from './data/locations';
import { calculateDistance, calculateScore, shuffleArray } from './utils/gameUtils';
import GameHeader from './components/GameHeader';
import WelcomeScreen from './components/WelcomeScreen';
import LocationImage from './components/LocationImage';
import GameMap from './components/GameMap';
import ScoreDisplay from './components/ScoreDisplay';
import GameResult from './components/GameResult';
import FinalResults from './components/FinalResults';

const TOTAL_ROUNDS = 5;

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentRound: 0,
    totalRounds: TOTAL_ROUNDS,
    score: 0,
    locations: [],
    currentLocation: null,
    guessedLocation: null,
    gamePhase: 'guessing',
    roundScores: [],
  });

  const [currentResult, setCurrentResult] = useState<GuessResult | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const initializeGame = useCallback(() => {
    const shuffledLocations = shuffleArray(gameLocations).slice(0, TOTAL_ROUNDS);
    setGameState({
      currentRound: 1,
      totalRounds: TOTAL_ROUNDS,
      score: 0,
      locations: shuffledLocations,
      currentLocation: shuffledLocations[0],
      guessedLocation: null,
      gamePhase: 'guessing',
      roundScores: [],
    });
    setCurrentResult(null);
    setGameStarted(true);
  }, []);

  const handleMapClick = useCallback((lat: number, lng: number) => {
    if (gameState.gamePhase !== 'guessing' || !gameState.currentLocation) return;

    const guessLocation = { lat, lng };
    const distance = calculateDistance(
      lat,
      lng,
      gameState.currentLocation.lat,
      gameState.currentLocation.lng
    );
    const result = calculateScore(distance);

    setCurrentResult(result);
    setGameState(prev => ({
      ...prev,
      guessedLocation: guessLocation,
      gamePhase: 'revealing',
      score: prev.score + result.score,
      roundScores: [...prev.roundScores, result.score],
    }));
  }, [gameState.gamePhase, gameState.currentLocation]);

  const handleNextRound = useCallback(() => {
    if (gameState.currentRound >= gameState.totalRounds) {
      setGameState(prev => ({ ...prev, gamePhase: 'finished' }));
      return;
    }

    const nextLocation = gameState.locations[gameState.currentRound];
    setGameState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      currentLocation: nextLocation,
      guessedLocation: null,
      gamePhase: 'guessing',
    }));
    setCurrentResult(null);
  }, [gameState.currentRound, gameState.totalRounds, gameState.locations]);

  const handlePlayAgain = useCallback(() => {
    setGameStarted(false);
    initializeGame();
  }, [initializeGame]);

  const handleGoHome = useCallback(() => {
    setGameStarted(false);
    setGameState({
      currentRound: 0,
      totalRounds: TOTAL_ROUNDS,
      score: 0,
      locations: [],
      currentLocation: null,
      guessedLocation: null,
      gamePhase: 'guessing',
      roundScores: [],
    });
  }, []);

  if (!gameStarted) {
    return <WelcomeScreen onStartGame={initializeGame} />;
  }

  if (gameState.gamePhase === 'finished') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <GameHeader onHome={handleGoHome} showHomeButton={true} />
        <div className="p-8">
          <FinalResults
            totalScore={gameState.score}
            maxPossibleScore={TOTAL_ROUNDS * 5000}
            roundScores={gameState.roundScores}
            onPlayAgain={handlePlayAgain}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <GameHeader onHome={handleGoHome} showHomeButton={true} />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Location Image */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Where is this landmark?
              </h2>
              <p className="text-gray-600 text-sm">
                Click on the map to make your guess
              </p>
            </div>
            {gameState.currentLocation && (
              <LocationImage
                location={gameState.currentLocation}
                className="w-full h-80"
              />
            )}
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="h-80 lg:h-96">
              <GameMap
                guessLocation={gameState.guessedLocation}
                actualLocation={gameState.currentLocation}
                showActual={gameState.gamePhase === 'revealing'}
                onMapClick={handleMapClick}
                disabled={gameState.gamePhase === 'revealing'}
              />
            </div>
          </div>
        </div>

        {/* Score Display */}
        <div className="mb-6">
          <ScoreDisplay
            currentScore={currentResult?.score || 0}
            totalScore={gameState.score}
            round={gameState.currentRound}
            totalRounds={gameState.totalRounds}
          />
        </div>

        {/* Result Modal */}
        {gameState.gamePhase === 'revealing' && currentResult && gameState.currentLocation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <GameResult
              result={currentResult}
              location={gameState.currentLocation}
              onNextRound={handleNextRound}
              isLastRound={gameState.currentRound >= gameState.totalRounds}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;