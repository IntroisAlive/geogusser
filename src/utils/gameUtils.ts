import { Location, GuessResult } from '../types/game';

// Haversine formula to calculate distance between two points on Earth
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Calculate score based on distance (closer = higher score)
export function calculateScore(distance: number): GuessResult {
  const maxScore = 5000;
  let score = 0;
  
  if (distance <= 1) {
    score = maxScore;
  } else if (distance <= 10) {
    score = Math.round(maxScore * 0.9);
  } else if (distance <= 50) {
    score = Math.round(maxScore * 0.8);
  } else if (distance <= 100) {
    score = Math.round(maxScore * 0.6);
  } else if (distance <= 500) {
    score = Math.round(maxScore * 0.4);
  } else if (distance <= 1000) {
    score = Math.round(maxScore * 0.2);
  } else if (distance <= 2000) {
    score = Math.round(maxScore * 0.1);
  } else {
    score = Math.round(maxScore * 0.05);
  }
  
  return {
    distance: Math.round(distance),
    score,
    maxScore
  };
}

// Shuffle array to randomize locations
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Format distance for display
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  } else if (distance < 1000) {
    return `${distance.toFixed(1)}km`;
  } else {
    return `${Math.round(distance).toLocaleString()}km`;
  }
}

// Get performance message based on distance
export function getPerformanceMessage(distance: number): string {
  if (distance <= 1) return "Perfect! 🎯";
  if (distance <= 10) return "Excellent! 🔥";
  if (distance <= 50) return "Great job! 👏";
  if (distance <= 100) return "Good guess! 👍";
  if (distance <= 500) return "Not bad! 🤔";
  if (distance <= 1000) return "Getting warmer... 🌡️";
  if (distance <= 2000) return "Could be better 📍";
  return "Keep trying! 🌍";
}