
import React from 'react';
import type { ThemeKey } from '../../types';
import { THEME_ASSETS } from '../../constants';
import { motion } from 'framer-motion';

interface ThemedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: ThemeKey;
  secondary?: boolean;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  theme,
  secondary = false,
  disabled,
  className,
  children,
  ...props
}) => {
  const themeAssets = THEME_ASSETS[theme];
  const bgColor = secondary ? themeAssets.secondary : themeAssets.primary;
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      disabled={disabled}
      className={`px-8 py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all duration-300
        ${bgColor}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'}
        ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default ThemedButton;
