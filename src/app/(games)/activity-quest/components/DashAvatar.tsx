
import React from 'react';
import type { AnimationKey, ThemeKey } from '../types';
import { THEME_ASSETS } from '../constants';
import { motion } from 'framer-motion';

interface DashAvatarProps {
  animationKey: AnimationKey;
  theme: ThemeKey;
}

const animationStyles: Record<AnimationKey, React.CSSProperties> = {
  wave: { transform: 'rotate(-10deg)' },
  jump: { transform: 'translateY(-20px)' },
  spin: { transform: 'rotate(360deg)' },
  balance: { transform: 'skewX(-15deg)' },
  stomp: { transform: 'scale(1.05)' },
};

const DashAvatar: React.FC<DashAvatarProps> = ({ animationKey, theme }) => {
  const themeAssets = THEME_ASSETS[theme];

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
      {/* Placeholder Dash Avatar */}
      <motion.div
        className="w-full h-full rounded-full flex flex-col items-center justify-center border-4 border-white shadow-lg"
        style={{
          background: `radial-gradient(circle, ${themeAssets.particleColor} 30%, transparent 70%)`,
          backgroundColor: themeAssets.secondary.replace('bg-', 'var(--tw-color-')
        }}
        animate={animationStyles[animationKey]}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
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
