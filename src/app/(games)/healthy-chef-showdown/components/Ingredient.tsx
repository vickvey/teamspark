import React from 'react';
import { Ingredient } from '../types';

interface IngredientProps {
  ingredient: Ingredient;
}

const IngredientComponent: React.FC<IngredientProps> = ({ ingredient }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('ingredientId', ingredient.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex flex-col items-center text-center cursor-grab active:cursor-grabbing p-2 bg-white/50 rounded-lg shadow hover:bg-white/80 transition-all transform hover:scale-110"
    >
      <ingredient.Icon className="w-16 h-16" />
      <span className="text-sm font-bold mt-1">{ingredient.name}</span>
      <span className={`text-xs font-semibold ${ingredient.nutritionScore > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {ingredient.nutritionScore > 0 ? `+${ingredient.nutritionScore}` : ingredient.nutritionScore}
      </span>
    </div>
  );
};

export default IngredientComponent;
