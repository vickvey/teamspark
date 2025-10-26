import React from 'react';
import { Recipe } from '../types';

interface ChefShowdownUIProps {
  timeLeft: number;
  recipe: Recipe | null;
}

const ChefShowdownUI: React.FC<ChefShowdownUIProps> = ({ timeLeft, recipe }) => {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-20">
      <div className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-lg">
        <h2 className="text-xl md:text-2xl">Challenge: {recipe?.name}</h2>
      </div>
      <div className="bg-red-500 text-white px-6 py-2 rounded-full shadow-lg">
        <span className="text-xl md:text-2xl">Time: {timeLeft}</span>
      </div>
    </div>
  );
};

export default ChefShowdownUI;
