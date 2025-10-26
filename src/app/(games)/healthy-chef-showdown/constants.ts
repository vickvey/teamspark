import { Ingredient, Recipe, GermVariant, GermVariantDetails } from "./types";
import {
  AppleIcon,
  BroccoliIcon,
  BreadIcon,
  ChickenLegIcon,
  MilkIcon,
  CandyIcon,
  SodaIcon,
  ChipsIcon,
  GreenGermIcon,
  BlueGermIcon,
  PinkGermIcon,
} from "./components/Icons";

// --- Healthy Chef Showdown Constants ---
export const CHEF_GAME_DURATION = 20; // seconds
export const AI_THINKING_SPEED = 1500; // milliseconds

export const INGREDIENTS: Ingredient[] = [
  {
    id: "apple",
    name: "Apple",
    nutritionScore: 10,
    category: "fruit",
    Icon: AppleIcon,
  },
  {
    id: "broccoli",
    name: "Broccoli",
    nutritionScore: 15,
    category: "vegetable",
    Icon: BroccoliIcon,
  },
  {
    id: "bread",
    name: "Bread",
    nutritionScore: 5,
    category: "grain",
    Icon: BreadIcon,
  },
  {
    id: "chicken",
    name: "Chicken",
    nutritionScore: 20,
    category: "protein",
    Icon: ChickenLegIcon,
  },
  {
    id: "milk",
    name: "Milk",
    nutritionScore: 8,
    category: "dairy",
    Icon: MilkIcon,
  },
  {
    id: "candy",
    name: "Candy",
    nutritionScore: -10,
    category: "junk",
    Icon: CandyIcon,
  },
  {
    id: "soda",
    name: "Soda",
    nutritionScore: -15,
    category: "junk",
    Icon: SodaIcon,
  },
  {
    id: "chips",
    name: "Chips",
    nutritionScore: -8,
    category: "junk",
    Icon: ChipsIcon,
  },
];

export const RECIPES: Recipe[] = [
  {
    name: "Healthy Breakfast",
    description: "Make a nutritious breakfast to start the day!",
  },
  { name: "Power Lunch", description: "Create a balanced lunch for energy!" },
  { name: "Super Snack", description: "Choose some healthy snacks!" },
];

// --- Germ Buster Constants ---
export const GERM_GAME_DURATION = 30; // seconds
export const GERM_SPAWN_RATE = 800; // milliseconds

export const HEALTH_TIPS: string[] = [
  "Wash your hands for at least 20 seconds with soap and water!",
  "Cover your mouth and nose when you cough or sneeze.",
  "Avoid touching your eyes, nose, and mouth to prevent spreading germs.",
  "Stay home when you're sick to protect others.",
  "Eat healthy foods to keep your immune system strong!",
];

export const GERM_VARIANTS: { [key in GermVariant]: GermVariantDetails } = {
  green: {
    points: 10,
    size: "w-16 h-16",
    Icon: GreenGermIcon,
  },
  blue: {
    points: 20,
    size: "w-12 h-12",
    Icon: BlueGermIcon,
  },
  pink: {
    points: 50,
    size: "w-10 h-10",
    Icon: PinkGermIcon,
  },
};
