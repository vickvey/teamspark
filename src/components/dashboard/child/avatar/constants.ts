import { 
  MaleSproutlingIcon, MaleBuddingHeroIcon, MaleHealthChampionIcon, MaleSuperGuardianIcon, MaleWellnessLegendIcon,
  FemaleSproutlingIcon, FemaleBuddingHeroIcon, FemaleHealthChampionIcon, FemaleSuperGuardianIcon, FemaleWellnessLegendIcon,
  FruitBadgeIcon, ExerciseBadgeIcon, LearningBadgeIcon, SleepBadgeIcon
} from './components/AvatarIcons';
import type { AvatarStage, Badge } from './types';

export const MALE_AVATAR_STAGES: AvatarStage[] = [
  {
    level: 1,
    name: "Sproutling",
    minPoints: 0,
    Icon: MaleSproutlingIcon,
    description: "Your health journey has just begun! Keep going to grow strong.",
  },
  {
    level: 2,
    name: "Budding Hero",
    minPoints: 100,
    Icon: MaleBuddingHeroIcon,
    description: "You're getting stronger! Every healthy choice makes a difference.",
  },
  {
    level: 3,
    name: "Health Champion",
    minPoints: 300,
    Icon: MaleHealthChampionIcon,
    description: "Look at you grow! You're becoming a true champion of wellness.",
  },
  {
    level: 4,
    name: "Super Guardian",
    minPoints: 600,
    Icon: MaleSuperGuardianIcon,
    description: "Amazing! You have the power to protect your health like a superhero.",
  },
  {
    level: 5,
    name: "Wellness Legend",
    minPoints: 1000,
    Icon: MaleWellnessLegendIcon,
    description: "You've reached legendary status! You're an inspiration to everyone.",
  },
];

export const FEMALE_AVATAR_STAGES: AvatarStage[] = [
  {
    level: 1,
    name: "Sproutling",
    minPoints: 0,
    Icon: FemaleSproutlingIcon,
    description: "Your health journey has just begun! Keep going to grow strong.",
  },
  {
    level: 2,
    name: "Budding Hero",
    minPoints: 100,
    Icon: FemaleBuddingHeroIcon,
    description: "You're getting stronger! Every healthy choice makes a difference.",
  },
  {
    level: 3,
    name: "Health Champion",
    minPoints: 300,
    Icon: FemaleHealthChampionIcon,
    description: "Look at you grow! You're becoming a true champion of wellness.",
  },
  {
    level: 4,
    name: "Super Guardian",
    minPoints: 600,
    Icon: FemaleSuperGuardianIcon,
    description: "Amazing! You have the power to protect your health like a superhero.",
  },
  {
    level: 5,
    name: "Wellness Legend",
    minPoints: 1000,
    Icon: FemaleWellnessLegendIcon,
    description: "You've reached legendary status! You're an inspiration to everyone.",
  },
];

export const avatarStagesByGender = {
  male: MALE_AVATAR_STAGES,
  female: FEMALE_AVATAR_STAGES,
};

export const BADGES: Badge[] = [
  {
    name: "Fruit Fanatic",
    minPoints: 50,
    Icon: FruitBadgeIcon,
    description: "Earned for making healthy food choices!",
  },
  {
    name: "Fitness Starter",
    minPoints: 200,
    Icon: ExerciseBadgeIcon,
    description: "Earned by staying active and exercising!",
  },
  {
    name: "Mindful Master",
    minPoints: 500,
    Icon: LearningBadgeIcon,
    description: "Earned for learning new things about health!",
  },
  {
    name: "Sleep Superstar",
    minPoints: 900,
    Icon: SleepBadgeIcon,
    description: "Earned for getting a full night's rest!",
  },
];
