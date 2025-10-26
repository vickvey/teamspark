"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChefShowdownGameState, Ingredient, Recipe } from "./types";
import {
  CHEF_GAME_DURATION,
  AI_THINKING_SPEED,
  INGREDIENTS,
  RECIPES,
} from "./constants";
import ChefShowdownOverlay from "./components/ChefShowdownOverlay";
import ChefShowdownUI from "./components/ChefShowdownUI";
import IngredientShelf from "./components/IngredientShelf";
import ChefArea from "./components/ChefArea";

const HealthyChefShowdown: React.FC = () => {
  const [gameState, setGameState] = useState<ChefShowdownGameState>("start");
  const [timeLeft, setTimeLeft] = useState(CHEF_GAME_DURATION);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [availableIngredients, setAvailableIngredients] =
    useState<Ingredient[]>(INGREDIENTS);
  const [playerDish, setPlayerDish] = useState<Ingredient[]>([]);
  const [aiDish, setAiDish] = useState<Ingredient[]>([]);
  const [winner, setWinner] = useState<"player" | "ai" | "tie" | null>(null);

  const timerIntervalRef = useRef<number | null>(null);
  const aiIntervalRef = useRef<number | null>(null);

  // 🧹 Cleanup helper
  const clearAllIntervals = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (aiIntervalRef.current) {
      clearInterval(aiIntervalRef.current);
      aiIntervalRef.current = null;
    }
  }, []);

  // 🧮 Scoring logic
  const calculateScore = useCallback((dish: Ingredient[]): number => {
    return dish.reduce((total, ing) => total + ing.nutritionScore, 0);
  }, []);

  // 🤖 AI Turn
  const aiTurn = useCallback(() => {
    setAvailableIngredients((prev) => {
      if (prev.length === 0) return prev;

      const healthyOptions = prev.filter((i) => i.nutritionScore > 0);
      const chosenIngredient =
        Math.random() < 0.7 && healthyOptions.length > 0
          ? healthyOptions[Math.floor(Math.random() * healthyOptions.length)]
          : prev[Math.floor(Math.random() * prev.length)];

      setAiDish((dish) => [...dish, chosenIngredient]);
      return prev.filter((i) => i.id !== chosenIngredient.id);
    });
  }, []);

  // 🚀 Start game
  const startGame = useCallback(() => {
    clearAllIntervals();
    setCurrentRecipe(RECIPES[Math.floor(Math.random() * RECIPES.length)]);
    setAvailableIngredients(INGREDIENTS);
    setPlayerDish([]);
    setAiDish([]);
    setTimeLeft(CHEF_GAME_DURATION);
    setWinner(null);
    setGameState("playing");

    // Timers
    timerIntervalRef.current = window.setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    aiIntervalRef.current = window.setInterval(aiTurn, AI_THINKING_SPEED);
  }, [aiTurn, clearAllIntervals]);

  // ✅ Safe Judging Logic (no direct setState inside effect)
  useEffect(() => {
    if (gameState === "playing" && timeLeft <= 0) {
      clearAllIntervals();

      // Defer to next tick to avoid cascading renders
      setTimeout(() => {
        setGameState("judging");

        const playerScore = calculateScore(playerDish);
        const aiScore = calculateScore(aiDish);

        if (playerScore > aiScore) setWinner("player");
        else if (aiScore > playerScore) setWinner("ai");
        else setWinner("tie");

        // Delay before result screen
        setTimeout(() => setGameState("result"), 3000);
      }, 0);
    }
  }, [
    timeLeft,
    gameState,
    playerDish,
    aiDish,
    calculateScore,
    clearAllIntervals,
  ]);

  // 🧹 Cleanup on unmount
  useEffect(() => clearAllIntervals, [clearAllIntervals]);

  // 🥕 Handle Player Drop
  const handleIngredientDrop = (ingredientId: string) => {
    const ingredient = availableIngredients.find(
      (ing) => ing.id === ingredientId
    );
    if (ingredient) {
      setPlayerDish((prev) => [...prev, ingredient]);
      setAvailableIngredients((prev) =>
        prev.filter((ing) => ing.id !== ingredientId)
      );
    }
  };

  const playerScore = calculateScore(playerDish);
  const aiScore = calculateScore(aiDish);

  return (
    <main
      className="bg-linear-to-br from-amber-100 to-orange-300 min-h-screen flex flex-col items-center justify-center text-gray-800 overflow-hidden select-none p-4"
      style={{ fontFamily: "'Fredoka One', cursive" }}
    >
      <div className="w-full max-w-6xl aspect-video bg-white/80 rounded-2xl shadow-2xl relative border-8 border-white flex flex-col">
        <ChefShowdownOverlay
          gameState={gameState}
          winner={winner}
          playerScore={playerScore}
          aiScore={aiScore}
          onStartGame={startGame}
        />

        {gameState === "playing" && (
          <>
            <ChefShowdownUI timeLeft={timeLeft} recipe={currentRecipe} />
            <div className="grow grid grid-cols-2 gap-4 p-4">
              <ChefArea
                title="Your Dish"
                dish={playerDish}
                score={playerScore}
                onDrop={handleIngredientDrop}
                isPlayer={true}
              />
              <ChefArea
                title="AI Chef's Dish"
                dish={aiDish}
                score={aiScore}
                isPlayer={false}
              />
            </div>
            <IngredientShelf ingredients={availableIngredients} />
          </>
        )}
      </div>
    </main>
  );
};

export default HealthyChefShowdown;
