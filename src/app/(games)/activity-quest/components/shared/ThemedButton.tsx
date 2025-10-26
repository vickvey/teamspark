"use client";
import React, { ReactNode } from "react";
import type { ThemeKey } from "../../types";
import { THEME_ASSETS } from "../../constants";
import { motion, HTMLMotionProps } from "framer-motion";

interface ThemedButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "ref"> {
  theme: ThemeKey;
  secondary?: boolean;
  children: ReactNode;
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

  // Cast props to HTMLMotionProps<"button"> to avoid TS conflict
  const motionProps = props as HTMLMotionProps<"button">;

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled}
      className={`px-8 py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all duration-300
        ${bgColor}
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"}
        ${className}`}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
};

export default ThemedButton;
