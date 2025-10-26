import React from 'react';
import { Ingredient } from '../types';
import { ChefIcon } from './Icons';

interface ChefAreaProps {
  title: string;
  dish: Ingredient[];
  score: number;
  isPlayer: boolean;
  onDrop?: (ingredientId: string) => void;
}

const ChefArea: React.FC<ChefAreaProps> = ({ title, dish, score, isPlayer, onDrop }) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (onDrop) {
      const ingredientId = e.dataTransfer.getData('ingredientId');
      onDrop(ingredientId);
    }
  };

  return (
    <div
      className={`flex flex-col h-full rounded-lg p-4 ${isPlayer ? 'bg-green-200/80' : 'bg-red-200/80'}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-2">
         <div className="flex items-center gap-2">
            <ChefIcon className={`w-8 h-8 ${isPlayer ? 'text-green-700' : 'text-red-700'}`} />
            <h3 className={`text-2xl font-bold ${isPlayer ? 'text-green-800' : 'text-red-800'}`}>{title}</h3>
        </div>
        <div className={`text-xl font-bold px-4 py-1 rounded-full ${isPlayer ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            Score: {score}
        </div>
      </div>
      <div className="flex-grow bg-white/60 rounded-md border-4 border-dashed border-gray-400/50 p-2 flex flex-wrap gap-2 content-start">
        {dish.map((ingredient) => (
          <div key={ingredient.id} className="flex flex-col items-center bg-white/80 p-1 rounded shadow">
            <ingredient.Icon className="w-10 h-10" />
            <span className="text-xs">{ingredient.name}</span>
          </div>
        ))}
        {dish.length === 0 && <p className="text-gray-500 self-center w-full text-center">Drag ingredients here!</p>}
      </div>
    </div>
  );
};

export default ChefArea;
