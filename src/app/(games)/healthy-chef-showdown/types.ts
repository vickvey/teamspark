import { FC } from "react";

// --- Healthy Chef Showdown Types ---
export type ChefShowdownGameState = "start" | "playing" | "judging" | "result";

export type IngredientCategory =
  | "fruit"
  | "vegetable"
  | "grain"
  | "protein"
  | "dairy"
  | "junk";

export interface Ingredient {
  id: string;
  name: string;
  nutritionScore: number;
  category: IngredientCategory;
  Icon: FC<{ className?: string }>;
}

export interface Recipe {
  name: string;
  description: string;
}

// --- Germ Buster Types ---
export type GermBusterGameState = "start" | "playing" | "gameOver";

export type GermVariant = "green" | "blue" | "pink";

export interface Germ {
  id: number;
  variant: GermVariant;
  x: number;
  y: number;
}

export interface GermVariantDetails {
  points: number;
  size: string;
  Icon: FC<{ className?: string }>;
}
