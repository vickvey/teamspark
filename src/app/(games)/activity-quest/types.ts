
export type ThemeKey = 'pirate' | 'robot' | 'princess' | 'default';

export type AnimationKey = 'jump' | 'spin' | 'balance' | 'stomp' | 'wave';

export interface UserProfile {
  userId: string;
  coinBalance: number;
  avatarTheme: ThemeKey;
  motionMatchCount: number;
}

export interface ThemeAssets {
  background: string;
  primary: string;
  secondary: string;
  accent: string;
  buttonText: string;
  particleColor: string;
}

export interface ActivityData {
  prompt: string;
  animationKey: AnimationKey;
}

export type GameState = 'home' | 'activity' | 'results';
