import React from "react";
import type { UserProfile } from "../types";
import { PLAY_COST } from "../constants";
import ThemedButton from "./shared/ThemedButton";
import CoinBalance from "./shared/CoinBalance";
import DashAvatar from "./DashAvatar";
import { motion } from "framer-motion";
import { useSessionStore } from "@/lib/store/useSessionStore";

interface HomeScreenProps {
  userProfile: UserProfile;
  onPlay: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ userProfile, onPlay }) => {
  const { avatarTheme } = userProfile;
  const { coins } = useSessionStore();
  const canPlay = coins >= PLAY_COST;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center">
      <CoinBalance balance={coins} />

      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <DashAvatar animationKey="wave" theme={avatarTheme} />
      </motion.div>

      <motion.h1
        className="text-4xl md:text-6xl font-bold mt-4 text-shadow"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Motion Match!
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl mt-2 text-white/80"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Get ready to move with Dash!
      </motion.p>

      <div className="mt-12 w-full max-w-xs">
        <ThemedButton
          onClick={onPlay}
          theme={avatarTheme}
          disabled={!canPlay}
          className="w-full"
        >
          <span className="text-xl font-bold">Play for {PLAY_COST} Coins</span>
        </ThemedButton>
        {!canPlay && (
          <motion.p
            className="mt-4 text-red-400 font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Not enough coins!
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
