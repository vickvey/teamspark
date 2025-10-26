import type { ThemeKey, ThemeAssets, AnimationKey, UserProfile } from "./types";

export const PLAY_COST = 10;
export const ACTIVITY_DURATION_S = 15;

export const MILESTONE_1_COUNT = 5;
export const MILESTONE_1_REWARD = 10;
export const MILESTONE_2_COUNT = 10;
export const MILESTONE_2_REWARD = 30;

export const THEME_ASSETS: Record<ThemeKey, ThemeAssets> = {
  default: {
    background: "bg-gradient-to-br from-gray-700 to-gray-900",
    primary: "bg-indigo-500",
    secondary: "bg-indigo-400",
    accent: "bg-pink-500",
    buttonText: "I Did It!",
    particleColor: "#ec4899",
  },
  pirate: {
    background: "bg-gradient-to-br from-blue-900 via-cyan-800 to-gray-800", // Deep sea to ship deck
    primary: "bg-amber-700", // Wood
    secondary: "bg-amber-500", // Gold
    accent: "bg-red-600", // Pirate sash
    buttonText: "Found Treasure!",
    particleColor: "#eab308",
  },
  robot: {
    background: "bg-gradient-to-br from-slate-800 via-slate-600 to-slate-900", // Metal factory
    primary: "bg-cyan-500", // Neon blue
    secondary: "bg-gray-400", // Steel
    accent: "bg-lime-400", // Energy green
    buttonText: "Power Up!",
    particleColor: "#84cc16",
  },
  princess: {
    background: "bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400", // Dreamy castle
    primary: "bg-fuchsia-500",
    secondary: "bg-violet-300",
    accent: "bg-yellow-300", // Gold crown
    buttonText: "Royal Decree!",
    particleColor: "#facc15",
  },
};

export const ANIMATION_KEYS: AnimationKey[] = [
  "jump",
  "spin",
  "balance",
  "stomp",
  "wave",
];

export const INITIAL_USER_PROFILE: UserProfile = {
  userId: "user-123",
  avatarTheme: "default",
  motionMatchCount: 0,
};
