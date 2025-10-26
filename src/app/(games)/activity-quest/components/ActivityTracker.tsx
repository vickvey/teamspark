
import React from 'react';
import type { ThemeKey } from '../types';
import { THEME_ASSETS, MILESTONE_1_COUNT, MILESTONE_2_COUNT } from '../constants';
import { motion } from 'framer-motion';

interface ActivityTrackerProps {
  previousCount: number;
  currentCount: number;
  total: number;
  theme: ThemeKey;
}

const MilestoneMarker: React.FC<{ position: string; label: string; achieved: boolean; theme: ThemeKey }> = ({ position, label, achieved, theme }) => {
  const themeAssets = THEME_ASSETS[theme];
  return (
    <div className="absolute top-0 flex flex-col items-center" style={{ left: position }}>
      <div className={`w-4 h-4 rounded-full border-2 border-white ${achieved ? themeAssets.accent : 'bg-gray-500'}`}></div>
      <p className="text-xs mt-1">{label}</p>
    </div>
  );
};

const ActivityTracker: React.FC<ActivityTrackerProps> = ({ previousCount, currentCount, total, theme }) => {
  const themeAssets = THEME_ASSETS[theme];
  const initialPercentage = (previousCount / total) * 100;
  const finalPercentage = (currentCount / total) * 100;

  return (
    <div className="w-full">
      <p className="font-semibold mb-2">Activity Tracker</p>
      <div className="relative w-full h-6 bg-black/30 rounded-full overflow-hidden border-2 border-white/50">
        <motion.div
          className={`h-full rounded-full ${themeAssets.primary}`}
          initial={{ width: `${initialPercentage}%` }}
          animate={{ width: `${finalPercentage}%` }}
          transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
        />
        <MilestoneMarker position="50%" label="🎁" achieved={currentCount >= MILESTONE_1_COUNT} theme={theme}/>
        <MilestoneMarker position="calc(100% - 8px)" label="🏆" achieved={currentCount >= MILESTONE_2_COUNT} theme={theme}/>
      </div>
       <p className="text-sm mt-2 text-white/80">{currentCount} / {total} Activities</p>
    </div>
  );
};

export default ActivityTracker;
