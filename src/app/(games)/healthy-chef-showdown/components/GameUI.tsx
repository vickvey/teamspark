
import React from 'react';

interface GameUIProps {
  score: number;
  timeLeft: number;
}

const GameUI: React.FC<GameUIProps> = ({ score, timeLeft }) => {
  return (
    <>
      <div className="absolute top-4 left-4 bg-purple-500 px-6 py-2 rounded-full shadow-lg z-20">
        <span className="text-3xl">Score: {score}</span>
      </div>
      <div className="absolute top-4 right-4 bg-red-500 px-6 py-2 rounded-full shadow-lg z-20">
        <span className="text-3xl">Time: {timeLeft}</span>
      </div>
    </>
  );
};

export default GameUI;
