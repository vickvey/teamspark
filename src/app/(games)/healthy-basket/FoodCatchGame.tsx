"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  GameState,
  initGameState,
  createFoodItem,
  updateFoodPositions,
  moveBasketLeft,
  moveBasketRight,
  checkCollision,
  catchFood,
  getSpawnInterval,
  getLevelName,
  getEncouragementMessage,
  getRandomHealthTip,
} from "./gameLogic";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FoodCatchGame: React.FC = () => {
  const router = useRouter();

  const [gameState, setGameState] = useState<GameState>(initGameState());
  const [message, setMessage] = useState<string>("");
  const [healthTip, setHealthTip] = useState<string>(getRandomHealthTip());

  const gameLoopRef = useRef<number>(0);
  const spawnTimerRef = useRef<number | null>(null);
  const lastUpdate = useRef<number>(0);
  const keysPressed = useRef<Set<string>>(new Set());

  // 🎮 Start Game
  const startGame = useCallback(() => {
    const newState = initGameState();
    setGameState({ ...newState, isPlaying: true });
    setMessage("");
    setHealthTip(getRandomHealthTip());
    lastUpdate.current = performance.now();
  }, []);

  const togglePause = useCallback(() => {
    setGameState((p) => ({ ...p, isPaused: !p.isPaused }));
  }, []);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  const showMessage = useCallback((msg: string, duration = 2000) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), duration);
  }, []);

  // 🍎 Spawn foods
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isPaused) {
      const interval = getSpawnInterval(gameState.level);
      spawnTimerRef.current = window.setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          foodItems: [...prev.foodItems, createFoodItem(prev.level)],
        }));
      }, interval);

      return () => {
        if (spawnTimerRef.current !== null)
          clearInterval(spawnTimerRef.current);
      };
    }
  }, [gameState.isPlaying, gameState.isPaused, gameState.level]);

  // 🔁 Game Loop
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isPaused) {
      const loop = () => {
        const now = performance.now();
        const delta = now - lastUpdate.current;
        lastUpdate.current = now;

        setGameState((prev) => {
          let s = { ...prev };

          // Move basket
          if (
            keysPressed.current.has("ArrowLeft") ||
            keysPressed.current.has("a")
          )
            s.basketPosition = moveBasketLeft(s.basketPosition);
          if (
            keysPressed.current.has("ArrowRight") ||
            keysPressed.current.has("d")
          )
            s.basketPosition = moveBasketRight(s.basketPosition);

          // Update foods
          s.foodItems = updateFoodPositions(s.foodItems, delta);

          // Check collisions
          const caughtIds: number[] = [];
          s.foodItems.forEach((f) => {
            if (checkCollision(f, s.basketPosition)) {
              caughtIds.push(f.id);
              const result = catchFood(s, f);
              s = result.state;
              showMessage(result.message, 1200);
            }
          });

          s.foodItems = s.foodItems.filter((f) => !caughtIds.includes(f.id));
          return s;
        });

        gameLoopRef.current = requestAnimationFrame(loop);
      };

      gameLoopRef.current = requestAnimationFrame(loop);

      return () => cancelAnimationFrame(gameLoopRef.current);
    }
  }, [gameState.isPlaying, gameState.isPaused, showMessage]);

  // ⌨️ Keyboard Controls
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "a", "d"].includes(e.key))
        keysPressed.current.add(e.key);
      if (e.key === " " && gameState.isPlaying) togglePause();
    };
    const up = (e: KeyboardEvent) => keysPressed.current.delete(e.key);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [gameState.isPlaying, togglePause]);

  // 🧭 Route after game over
  useEffect(() => {
    if (!gameState.isPlaying && gameState.lives <= 0) {
      const timer = window.setTimeout(() => router.push("/child"), 4000);
      return () => clearTimeout(timer);
    }
  }, [gameState.isPlaying, gameState.lives, router]);

  // 🎬 Start Screen
  if (!gameState.isPlaying && gameState.lives > 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-linear-to-b from-sky-300 to-sky-500">
        <Card className="p-10 text-center space-y-6 shadow-xl bg-white/90">
          <h1 className="text-4xl font-bold text-orange-600">
            🍎 Healthy Food Catch!
          </h1>
          <Button
            size="lg"
            onClick={startGame}
            className="bg-amber-400 hover:bg-amber-500"
          >
            🎮 Start Game
          </Button>
          <div className="text-gray-700 text-lg space-y-2">
            <p>Use ← → or A/D to move basket</p>
            <p>✅ Catch healthy foods, ❌ avoid junk!</p>
            <p>⏸ Press SPACE to pause</p>
            <p>🏆 High Score: {gameState.highScore}</p>
          </div>
        </Card>
      </div>
    );
  }

  // 🧾 Game Over
  if (!gameState.isPlaying && gameState.lives <= 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-linear-to-b from-red-300 to-orange-400 text-white text-center">
        <Card className="bg-white/10 p-10 backdrop-blur-md text-white shadow-2xl space-y-6">
          <h1 className="text-5xl font-bold">😢 Game Over!</h1>
          <p className="text-xl">Final Score: {gameState.score}</p>
          <p>High Score: {gameState.highScore}</p>
          <p>Level Reached: {gameState.level}</p>
          <p>{getEncouragementMessage(gameState.score)}</p>
          <Button
            onClick={restartGame}
            size="lg"
            className="bg-yellow-400 text-black hover:bg-yellow-500"
          >
            🔄 Play Again
          </Button>
        </Card>
      </div>
    );
  }

  // 🎯 Game Playing
  return (
    <div className="relative mx-auto my-6 max-w-4xl h-[600px] bg-linear-to-b from-sky-200 to-sky-400 rounded-3xl shadow-2xl overflow-hidden font-fredoka">
      {/* HUD */}
      <div className="absolute top-4 left-0 right-0 flex justify-between px-6 text-lg font-semibold z-10">
        <div className="bg-white/80 px-4 py-2 rounded-xl text-pink-600">
          Score: {gameState.score}
        </div>
        <div className="bg-white/80 px-4 py-2 rounded-xl text-teal-600">
          {getLevelName(gameState.level)}
        </div>
        <div className="bg-white/80 px-4 py-2 rounded-xl text-red-600">
          {"❤️".repeat(gameState.lives)}
        </div>
      </div>

      {/* Pause Button */}
      <Button
        size="icon"
        className="absolute top-4 right-4 bg-white/90 text-xl"
        onClick={togglePause}
      >
        {gameState.isPaused ? "▶️" : "⏸️"}
      </Button>

      {/* Food items */}
      {gameState.foodItems.map((f) => (
        <div
          key={f.id}
          className="absolute text-5xl drop-shadow-lg transition-transform"
          style={{ left: `${f.x}%`, top: `${f.y}%` }}
        >
          {f.emoji}
        </div>
      ))}

      {/* Basket */}
      <div
        className="absolute bottom-5 h-16 w-1/6 bg-linear-to-b from-amber-700 to-amber-900 rounded-t-3xl border-4 border-amber-950 flex items-center justify-center text-3xl shadow-xl"
        style={{ left: `${gameState.basketPosition}%` }}
      >
        🧺
      </div>

      {/* Message */}
      {message && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 px-8 py-4 rounded-2xl text-3xl font-bold text-gray-800 animate-bounce shadow-lg">
            {message}
          </div>
        </div>
      )}

      {/* Health Tip */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-white/80 px-4 py-2 rounded-xl text-sm text-gray-700 shadow-md max-w-md text-center">
        {healthTip}
      </div>

      {/* Pause Overlay */}
      {gameState.isPaused && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white space-y-6 z-20">
          <h1 className="text-5xl">⏸️ Paused</h1>
          <Button
            onClick={togglePause}
            className="bg-yellow-400 text-black hover:bg-yellow-500"
          >
            Resume Game
          </Button>
          <p>Press SPACE to resume</p>
        </div>
      )}
    </div>
  );
};

export default FoodCatchGame;
