import type { ActivityData, ThemeKey } from './types';

export const ACTIVITIES: Record<ThemeKey, ActivityData[]> = {
  "default": [
    { "prompt": "Jump up high!", "animationKey": "jump" },
    { "prompt": "Spin in a circle!", "animationKey": "spin" },
    { "prompt": "Stomp your feet!", "animationKey": "stomp" },
    { "prompt": "Wave hello!", "animationKey": "wave" },
    { "prompt": "Balance on one foot!", "animationKey": "balance" },
    { "prompt": "Do a silly wiggle!", "animationKey": "spin" },
    { "prompt": "Reach for the sky!", "animationKey": "jump" },
    { "prompt": "Tap your toes!", "animationKey": "stomp" }
  ],
  "pirate": [
    { "prompt": "Swab the Deck!", "animationKey": "spin" },
    { "prompt": "Walk the Plank!", "animationKey": "balance" },
    { "prompt": "Jump over a cannonball!", "animationKey": "jump" },
    { "prompt": "Dig for treasure!", "animationKey": "stomp" },
    { "prompt": "Steer the ship!", "animationKey": "spin" },
    { "prompt": "Climb the rigging!", "animationKey": "jump" },
    { "prompt": "Wave your pirate flag!", "animationKey": "wave" },
    { "prompt": "Stomp like a pirate!", "animationKey": "stomp" },
    { "prompt": "Balance on the rolling ship!", "animationKey": "balance" }
  ],
  "robot": [
    { "prompt": "Do the Robot!", "animationKey": "stomp" },
    { "prompt": "Spin your gears!", "animationKey": "spin" },
    { "prompt": "Power up!", "animationKey": "jump" },
    { "prompt": "March like a robot!", "animationKey": "stomp" },
    { "prompt": "Wave your robot claw!", "animationKey": "wave" },
    { "prompt": "Short circuit! Wiggle!", "animationKey": "spin" },
    { "prompt": "Scan the room!", "animationKey": "balance" },
    { "prompt": "Boing! A spring popped!", "animationKey": "jump" }
  ],
  "princess": [
    { "prompt": "Twirl in a royal dance!", "animationKey": "spin" },
    { "prompt": "Wave to the kingdom!", "animationKey": "wave" },
    { "prompt": "Curtsy or bow!", "animationKey": "balance" },
    { "prompt": "Jump for royal joy!", "animationKey": "jump" },
    { "prompt": "Practice your royal walk!", "animationKey": "balance" },
    { "prompt": "Stomp like a royal giant!", "animationKey": "stomp" },
    { "prompt": "Cast a magic spell!", "animationKey": "wave" },
    { "prompt": "Spin to your throne!", "animationKey": "spin" }
  ]
};

export const generateActivity = (theme: ThemeKey): ActivityData => {
  const themeActivities = ACTIVITIES[theme] || ACTIVITIES.default;
  const randomIndex = Math.floor(Math.random() * themeActivities.length);
  return themeActivities[randomIndex];
};
