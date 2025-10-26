"use client";

import React, { useState, useEffect, useRef } from "react";
import type { ThemeKey, ActivityData } from "../types";
import { ACTIVITY_DURATION_S } from "../constants";
import { generateActivity } from "../activities";
import ThemedButton from "./shared/ThemedButton";
import DashAvatar from "./DashAvatar";
import { motion, AnimatePresence } from "framer-motion";

interface ActivityScreenProps {
  theme: ThemeKey;
  onComplete: () => void;
}

const ActivityScreen: React.FC<ActivityScreenProps> = ({
  theme,
  onComplete,
}) => {
  const [activityData, setActivityData] = useState<ActivityData | null>(null);
  const [timeLeft, setTimeLeft] = useState(ACTIVITY_DURATION_S);
  const [showDidItButton, setShowDidItButton] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Wrap in a microtask to avoid synchronous setState warning
    const id = setTimeout(() => {
      const data = generateActivity(theme);
      setActivityData(data);
    }, 0);

    return () => clearTimeout(id);
  }, [theme]);

  useEffect(() => {
    if (activityData) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setShowDidItButton(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activityData]);

  if (!activityData) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        <p className="ml-4 text-2xl">Getting ready...</p>
      </div>
    );
  }

  const timerProgress = (timeLeft / ACTIVITY_DURATION_S) * 100;

  return (
    <div className="flex flex-col items-center justify-between w-full h-full p-8 text-center">
      <div className="w-full max-w-md">
        <p className="text-xl text-white/80">Time Left</p>
        <div className="w-full bg-black/30 rounded-full h-4 mt-2 overflow-hidden">
          <motion.div
            className="bg-green-500 h-4 rounded-full"
            initial={{ width: "100%" }}
            animate={{ width: `${timerProgress}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </div>
        <p className="text-4xl font-bold mt-2">{timeLeft}</p>
      </div>

      <div className="flex flex-col items-center">
        <DashAvatar animationKey={activityData.animationKey} theme={theme} />
        <motion.p
          key={activityData.prompt}
          className="text-3xl md:text-5xl font-bold mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {activityData.prompt}
        </motion.p>
      </div>

      <div className="h-24">
        <AnimatePresence>
          {showDidItButton && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring" }}
            >
              <ThemedButton onClick={onComplete} theme={theme} className="w-64">
                I Did It!
              </ThemedButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActivityScreen;
