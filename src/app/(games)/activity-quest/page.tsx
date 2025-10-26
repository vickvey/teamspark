"use client";

import React, { useState, useCallback } from "react";
import type { UserProfile, GameState, ThemeKey } from "./types";
import {
  INITIAL_USER_PROFILE,
  MILESTONE_1_COUNT,
  MILESTONE_1_REWARD,
  MILESTONE_2_COUNT,
  MILESTONE_2_REWARD,
  PLAY_COST,
  THEME_ASSETS,
} from "./constants";
import HomeScreen from "./components/HomeScreen";
import ActivityScreen from "./components/ActivityScreen";
import ResultsScreen from "./components/ResultsScreen";
import { AnimatePresence, motion } from "framer-motion";

const ThemeSelector: React.FC<{
  currentTheme: ThemeKey;
  onSelectTheme: (theme: ThemeKey) => void;
}> = ({ currentTheme, onSelectTheme }) => (
  <div className="absolute top-4 left-4 flex gap-2 bg-black/30 p-2 rounded-lg z-50">
    {(Object.keys(THEME_ASSETS) as ThemeKey[]).map((theme) => (
      <button
        key={theme}
        onClick={() => onSelectTheme(theme)}
        className={`w-8 h-8 rounded-full capitalize text-white text-xs transition-all duration-300 ${
          THEME_ASSETS[theme].primary
        } ${
          currentTheme === theme
            ? "ring-2 ring-offset-2 ring-offset-gray-800 ring-white"
            : "hover:scale-110"
        }`}
        title={theme}
      >
        {theme.charAt(0)}
      </button>
    ))}
  </div>
);

export default function App() {
  const [userProfile, setUserProfile] =
    useState<UserProfile>(INITIAL_USER_PROFILE);
  const [gameState, setGameState] = useState<GameState>("home");
  const [previousCount, setPreviousCount] = useState(0);

  const { motionMatchCount, avatarTheme } = userProfile;
  const themeAssets = THEME_ASSETS[avatarTheme];

  const handlePlay = useCallback(() => {
    if (userProfile.coinBalance >= PLAY_COST) {
      setUserProfile((prev) => ({
        ...prev,
        coinBalance: prev.coinBalance - PLAY_COST,
      }));
      setPreviousCount(motionMatchCount);
      setGameState("activity");
    }
  }, [userProfile.coinBalance, motionMatchCount]);

  const handleActivityComplete = useCallback(() => {
    setUserProfile((prev) => {
      const newCount = prev.motionMatchCount + 1;
      let newBalance = prev.coinBalance;
      let finalCount = newCount;

      if (newCount === MILESTONE_1_COUNT) {
        newBalance += MILESTONE_1_REWARD;
      }
      if (newCount === MILESTONE_2_COUNT) {
        newBalance += MILESTONE_2_REWARD;
        finalCount = 0;
      }

      return { ...prev, coinBalance: newBalance, motionMatchCount: finalCount };
    });
    setGameState("results");
  }, []);

  const handlePlayAgain = useCallback(() => {
    handlePlay();
  }, [handlePlay]);

  const handleGoHome = useCallback(() => {
    setGameState("home");
  }, []);

  const handleSelectTheme = useCallback((theme: ThemeKey) => {
    setUserProfile((prev) => ({ ...prev, avatarTheme: theme }));
  }, []);

  return (
    <div
      className={`relative w-full h-screen overflow-hidden text-white font-sans ${themeAssets.background}`}
    >
      <ThemeSelector
        currentTheme={avatarTheme}
        onSelectTheme={handleSelectTheme}
      />
      <AnimatePresence mode="wait">
        {gameState === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.4 } }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-full h-full"
          >
            <HomeScreen userProfile={userProfile} onPlay={handlePlay} />
          </motion.div>
        )}
        {gameState === "activity" && (
          <motion.div
            key="activity"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{
              y: "-100%",
              transition: { ease: "easeInOut", duration: 0.5 },
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="w-full h-full"
          >
            <ActivityScreen
              theme={avatarTheme}
              onComplete={handleActivityComplete}
            />
          </motion.div>
        )}
        {gameState === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <ResultsScreen
              userProfile={userProfile}
              previousCount={previousCount}
              onPlayAgain={handlePlayAgain}
              onGoHome={handleGoHome}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
