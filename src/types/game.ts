export interface Location {
  id: number;
  name: string;
  country: string;
  lat: number;
  lng: number;
  imageUrl: string;
  description: string;
}

export interface GameState {
  currentRound: number;
  totalRounds: number;
  score: number;
  locations: Location[];
  currentLocation: Location | null;
  guessedLocation: { lat: number; lng: number } | null;
  gamePhase: 'guessing' | 'revealing' | 'finished';
  roundScores: number[];
}

export interface GuessResult {
  distance: number;
  score: number;
  maxScore: number;
}