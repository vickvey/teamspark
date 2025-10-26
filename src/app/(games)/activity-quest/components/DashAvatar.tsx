"use client";

import React from "react";
import type { AnimationKey, ThemeKey } from "../types";
import { THEME_ASSETS } from "../constants";
import { motion, Variants } from "framer-motion";

interface DashAvatarProps {
  animationKey: AnimationKey;
  theme: ThemeKey;
}

// Use Variants type for Framer Motion
const avatarVariants: Variants = {
  wave: {
    rotate: [-10, 10, -10],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
  jump: {
    y: [0, -20, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
  spin: {
    rotate: [0, 360],
    transition: { duration: 1.5, repeat: Infinity, ease: "linear" },
  },
  balance: {
    skewX: [-15, 15, -15],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
  stomp: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

const DashAvatar: React.FC<DashAvatarProps> = ({ animationKey, theme }) => {
  const themeAssets = THEME_ASSETS[theme];

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
      <motion.div
        className="w-full h-full rounded-full flex flex-col items-center justify-center border-4 border-white shadow-lg"
        style={{
          background: `radial-gradient(circle, ${themeAssets.particleColor} 30%, transparent 70%)`,
          backgroundColor:
            themeAssets.secondary.replace("bg-", "var(--tw-color-") + ")",
        }}
        variants={avatarVariants}
        animate={animationKey} // animate via variant key
      >
        <div className="text-6xl">😀</div>
        <p className="mt-2 text-white font-bold text-lg capitalize bg-black/30 px-2 py-1 rounded">
          {animationKey}
        </p>
      </motion.div>
    </div>
  );
};

export default DashAvatar;
