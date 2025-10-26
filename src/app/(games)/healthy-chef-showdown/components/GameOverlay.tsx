

import React from 'react';
// FIX: Aliased GermBusterGameState to GameState to fix import error.
import { GermBusterGameState as GameState } from '../types';

interface GameOverlayProps {
  gameState: GameState;
  score: number;
  healthTip: string;
  onStartGame: () => void;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ gameState, score, healthTip, onStartGame }) => {
  if (gameState === 'playing') {
    return null;
  }

  if (gameState === 'start') {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center z-10 p-4">
        <h1 className="text-6xl md:text-8xl text-green-400 drop-shadow-lg">Germ Buster</h1>
        <p className="text-xl md:text-2xl text-white mt-4 max-w-md">Click on the germs as fast as you can before the time runs out! Ready to clean up?</p>
        <button onClick={onStartGame} className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-4 px-10 rounded-full text-3xl transition-transform transform hover:scale-105 shadow-lg">
          Start Game!
        </button>
      </div>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center z-10 p-4">
        <h2 className="text-5xl md:text-7xl text-yellow-400 drop-shadow-lg">Great Job!</h2>
        <p className="text-3xl md:text-4xl text-white mt-4">Your Score: {score}</p>
        <div className="bg-blue-200 text-blue-800 p-4 rounded-lg mt-6 max-w-lg shadow-md">
          <h3 className="font-bold text-xl">Health Tip:</h3>
          <p className="text-lg">{healthTip}</p>
        </div>
        <button onClick={onStartGame} className="mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full text-3xl transition-transform transform hover:scale-105 shadow-lg">
          Play Again
        </button>
      </div>
    );
  }

  return null;
};

export default GameOverlay;