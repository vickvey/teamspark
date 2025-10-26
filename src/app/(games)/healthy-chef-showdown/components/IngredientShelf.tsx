import React from 'react';
import { Ingredient } from '../types';
import IngredientComponent from './Ingredient';

interface IngredientShelfProps {
  ingredients: Ingredient[];
}

const IngredientShelf: React.FC<IngredientShelfProps> = ({ ingredients }) => {
  return (
    <div className="w-full bg-amber-600/70 p-4 border-t-8 border-amber-800">
      <h3 className="text-center text-white text-2xl mb-2">Ingredients</h3>
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {ingredients.map(ingredient => (
          <IngredientComponent key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
};

export default IngredientShelf;
