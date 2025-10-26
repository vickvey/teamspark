"use client";
import React, { useState, useEffect } from "react";
import type { UserProfile } from "../types";
import {
  MILESTONE_1_COUNT,
  MILESTONE_1_REWARD,
  MILESTONE_2_COUNT,
  MILESTONE_2_REWARD,
  PLAY_COST,
  THEME_ASSETS,
} from "../constants";
import { useSessionStore } from "@/lib/store/useSessionStore";
import ThemedButton from "./shared/ThemedButton";
import ActivityTracker from "./ActivityTracker";
import CoinBalance from "./shared/CoinBalance";
import { motion, AnimatePresence } from "framer-motion";

interface ResultsScreenProps {
  userProfile: UserProfile;
  previousCount: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

const PrizeBox: React.FC<{
  reward: number;
  theme: string;
  onOpen: () => void;
}> = ({ reward, theme, onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      onOpen();
    }, 1500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
    >
      <h3 className="text-3xl font-bold text-yellow-300">Prize Box!</h3>
      <motion.div
        className={`w-32 h-32 mt-4 rounded-lg ${
          THEME_ASSETS[theme as keyof typeof THEME_ASSETS].accent
        }`}
        animate={
          isOpen
            ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }
            : { y: [0, -10, 0] }
        }
        transition={{ repeat: isOpen ? 0 : Infinity, duration: 1 }}
      >
        {/* Placeholder for a box image */}
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mt-4 flex items-center gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-4xl font-bold text-yellow-400">
              +{reward}
            </span>
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-yellow-800 font-bold text-xl">
              C
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  userProfile,
  previousCount,
  onPlayAgain,
  onGoHome,
}) => {
  const { motionMatchCount, avatarTheme } = userProfile;
  const { coins } = useSessionStore();
  const [prize, setPrize] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newCount = previousCount + 1;
      if (newCount === MILESTONE_1_COUNT) setPrize(MILESTONE_1_REWARD);
      else if (newCount === MILESTONE_2_COUNT) setPrize(MILESTONE_2_REWARD);
    }, 0);

    return () => clearTimeout(timer);
  }, [previousCount]);

  const canPlay = coins >= PLAY_COST;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center">
      <CoinBalance balance={coins} />

      <motion.h2
        className="text-4xl md:text-6xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Activity Complete!
      </motion.h2>

      <div className="my-8 w-full max-w-md">
        {prize ? (
          <PrizeBox reward={prize} theme={avatarTheme} onOpen={() => {}} />
        ) : (
          <ActivityTracker
            previousCount={previousCount}
            currentCount={
              motionMatchCount === 0 && previousCount === MILESTONE_2_COUNT - 1
                ? MILESTONE_2_COUNT
                : motionMatchCount
            }
            total={MILESTONE_2_COUNT}
            theme={avatarTheme}
          />
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <ThemedButton
          onClick={onPlayAgain}
          theme={avatarTheme}
          disabled={!canPlay}
        >
          Play Again ({PLAY_COST} Coins)
        </ThemedButton>
        <ThemedButton onClick={onGoHome} theme={avatarTheme} secondary>
          Go Home
        </ThemedButton>
      </div>
      {!canPlay && (
        <p className="mt-4 text-red-400 font-semibold">
          Not enough coins to play again!
        </p>
      )}
    </div>
  );
};

export default ResultsScreen;
