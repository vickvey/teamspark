/**
 * Game Logic for Food Catch Game
 * Manages game state, food items, scoring, and game mechanics
 */

// Food item interface
export interface FoodItem {
  id: number;
  name: string;
  emoji: string;
  isHealthy: boolean;
  x: number; // X position (0-100%)
  y: number; // Y position (0-100%)
  speed: number; // Fall speed
  points: number; // Points awarded/deducted
}

// Game state interface
export interface GameState {
  score: number;
  lives: number;
  level: number;
  isPlaying: boolean;
  isPaused: boolean;
  foodItems: FoodItem[];
  basketPosition: number; // X position (0-100%)
  highScore: number;
  timeElapsed: number;
  coins: number; // Coins earned this session
  totalCoins: number; // Total coins across all games
}

// Healthy foods with emojis
export const HEALTHY_FOODS = [
  { name: "Apple", emoji: "🍎", points: 10 },
  { name: "Banana", emoji: "🍌", points: 10 },
  { name: "Broccoli", emoji: "🥦", points: 15 },
  { name: "Carrot", emoji: "🥕", points: 15 },
  { name: "Strawberry", emoji: "🍓", points: 10 },
  { name: "Grapes", emoji: "🍇", points: 10 },
  { name: "Watermelon", emoji: "🍉", points: 10 },
  { name: "Orange", emoji: "🍊", points: 10 },
  { name: "Tomato", emoji: "🍅", points: 15 },
  { name: "Avocado", emoji: "🥑", points: 20 },
  { name: "Salad", emoji: "🥗", points: 20 },
  { name: "Milk", emoji: "🥛", points: 15 },
  { name: "Fish", emoji: "🐟", points: 20 },
  { name: "Egg", emoji: "🥚", points: 15 },
];

// Unhealthy foods with emojis
export const UNHEALTHY_FOODS = [
  { name: "Candy", emoji: "🍬", points: -10 },
  { name: "Donut", emoji: "🍩", points: -10 },
  { name: "Ice Cream", emoji: "🍦", points: -10 },
  { name: "Cookie", emoji: "🍪", points: -10 },
  { name: "Cake", emoji: "🍰", points: -10 },
  { name: "Fries", emoji: "🍟", points: -15 },
  { name: "Pizza", emoji: "🍕", points: -15 },
  { name: "Burger", emoji: "🍔", points: -15 },
  { name: "Soda", emoji: "🥤", points: -15 },
  { name: "Chips", emoji: "🍿", points: -10 },
];

// Game constants
export const GAME_CONFIG = {
  BASKET_WIDTH: 15, // Percentage of screen width
  BASKET_SPEED: 3, // Movement speed
  INITIAL_LIVES: 3,
  INITIAL_SPAWN_INTERVAL: 2000, // milliseconds
  MIN_SPAWN_INTERVAL: 800,
  FALL_SPEED_MIN: 0.5,
  FALL_SPEED_MAX: 1.5,
  LEVEL_UP_SCORE: 100, // Score needed to level up
  SPEED_INCREASE_PER_LEVEL: 0.1,
  POINTS_TO_COINS_RATIO: 0.5, // 1 point = 0.5 coins (10 points = 5 coins)
  LEVEL_UP_COIN_BONUS: 50, // Bonus coins when leveling up
};

let nextFoodId = 0;

/**
 * Create a new food item
 */
export function createFoodItem(level: number): FoodItem {
  const isHealthy = Math.random() > 0.3; // 70% healthy, 30% unhealthy
  const foodArray = isHealthy ? HEALTHY_FOODS : UNHEALTHY_FOODS;
  const food = foodArray[Math.floor(Math.random() * foodArray.length)];

  const speed =
    GAME_CONFIG.FALL_SPEED_MIN +
    Math.random() * (GAME_CONFIG.FALL_SPEED_MAX - GAME_CONFIG.FALL_SPEED_MIN) +
    level * GAME_CONFIG.SPEED_INCREASE_PER_LEVEL;

  return {
    id: nextFoodId++,
    name: food.name,
    emoji: food.emoji,
    isHealthy,
    x: Math.random() * 85 + 5, // 5% to 90% to avoid edges
    y: -10, // Start above screen
    speed,
    points: food.points,
  };
}

/**
 * Initialize game state
 */
export function initGameState(): GameState {
  const savedHighScore = localStorage.getItem("foodCatchHighScore");
  const savedTotalCoins = localStorage.getItem("healthQuestTotalCoins");

  return {
    score: 0,
    lives: GAME_CONFIG.INITIAL_LIVES,
    level: 1,
    isPlaying: false,
    isPaused: false,
    foodItems: [],
    basketPosition: 50, // Start in center
    highScore: savedHighScore ? parseInt(savedHighScore) : 0,
    timeElapsed: 0,
    coins: 0, // Coins earned this session
    totalCoins: savedTotalCoins ? parseInt(savedTotalCoins) : 0, // Total coins across all games
  };
}

/**
 * Update food item positions
 */
export function updateFoodPositions(
  foodItems: FoodItem[],
  deltaTime: number
): FoodItem[] {
  return foodItems
    .map((food) => ({
      ...food,
      y: food.y + food.speed * (deltaTime / 16), // Normalize to 60fps
    }))
    .filter((food) => food.y < 110); // Remove items that went off screen
}

/**
 * Move basket left
 */
export function moveBasketLeft(currentPosition: number): number {
  return Math.max(0, currentPosition - GAME_CONFIG.BASKET_SPEED);
}

/**
 * Move basket right
 */
export function moveBasketRight(currentPosition: number): number {
  return Math.min(
    100 - GAME_CONFIG.BASKET_WIDTH,
    currentPosition + GAME_CONFIG.BASKET_SPEED
  );
}

/**
 * Check if food item is caught by basket
 */
export function checkCollision(
  food: FoodItem,
  basketPosition: number
): boolean {
  const basketLeft = basketPosition;
  const basketRight = basketPosition + GAME_CONFIG.BASKET_WIDTH;
  const foodCenter = food.x;

  // Check if food is at basket level (y > 85%)
  if (food.y >= 85 && food.y <= 95) {
    // Check if food center is within basket bounds
    return foodCenter >= basketLeft && foodCenter <= basketRight;
  }

  return false;
}

/**
 * Update game state after catching food
 */
export function catchFood(
  state: GameState,
  food: FoodItem
): {
  state: GameState;
  message: string;
  soundEffect: string;
  coinsEarned: number;
} {
  let newScore = state.score + food.points;
  let newLives = state.lives;
  let message = "";
  let soundEffect = "";
  let coinsEarned = 0;

  if (food.isHealthy) {
    newScore = Math.max(0, newScore);
    // Convert points to coins
    coinsEarned = Math.floor(food.points * GAME_CONFIG.POINTS_TO_COINS_RATIO);
    message = `+${food.points} pts, +${coinsEarned} coins! 💰`;
    soundEffect = "success";
  } else {
    newScore = Math.max(0, newScore);
    newLives = newLives - 1;
    message = `${food.points} points! ❌`;
    soundEffect = "fail";
  }

  // Update coins
  const newCoins = state.coins + coinsEarned;
  //   const newTotalCoins = state.totalCoins + coinsEarned;

  // Check for level up
  const newLevel = Math.floor(newScore / GAME_CONFIG.LEVEL_UP_SCORE) + 1;
  const leveledUp = newLevel > state.level;

  if (leveledUp) {
    // Award bonus coins for leveling up
    const bonusCoins = GAME_CONFIG.LEVEL_UP_COIN_BONUS;
    coinsEarned += bonusCoins;
    message = `Level ${newLevel}! +${bonusCoins} bonus coins! 🎊💰`;
    soundEffect = "levelup";
  }

  // Update high score
  const newHighScore = Math.max(state.highScore, newScore);
  if (newHighScore > state.highScore) {
    localStorage.setItem("foodCatchHighScore", newHighScore.toString());
  }

  // Save total coins to localStorage
  const finalTotalCoins = state.totalCoins + coinsEarned;
  localStorage.setItem("healthQuestTotalCoins", finalTotalCoins.toString());

  // Check game over
  const isGameOver = newLives <= 0;

  return {
    state: {
      ...state,
      score: newScore,
      lives: newLives,
      level: newLevel,
      highScore: newHighScore,
      isPlaying: !isGameOver,
      coins: newCoins,
      totalCoins: finalTotalCoins,
    },
    message: isGameOver ? "Game Over! 😢" : message,
    soundEffect: isGameOver ? "gameover" : soundEffect,
    coinsEarned,
  };
}

/**
 * Calculate spawn interval based on level
 */
export function getSpawnInterval(level: number): number {
  const interval = GAME_CONFIG.INITIAL_SPAWN_INTERVAL - (level - 1) * 200;
  return Math.max(GAME_CONFIG.MIN_SPAWN_INTERVAL, interval);
}

/**
 * Get level name/description
 */
export function getLevelName(level: number): string {
  const levels = [
    "Beginner Chef",
    "Kitchen Helper",
    "Food Expert",
    "Nutrition Pro",
    "Health Master",
    "Wellness Guru",
    "Super Nutritionist",
    "Health Hero",
    "Legendary Chef",
    "Food Legend",
  ];

  return levels[Math.min(level - 1, levels.length - 1)] || `Level ${level}`;
}

/**
 * Get encouragement message based on score
 */
export function getEncouragementMessage(score: number): string {
  if (score >= 500) return "You're a Health Hero! 🦸‍♂️";
  if (score >= 400) return "Amazing! Keep going! 🌟";
  if (score >= 300) return "Fantastic work! 🎉";
  if (score >= 200) return "Great job! 💪";
  if (score >= 100) return "You're doing well! 👏";
  if (score >= 50) return "Nice start! 😊";
  return "Keep trying! 🌈";
}

/**
 * Format time for display
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Get random health tip
 */
export function getRandomHealthTip(): string {
  const tips = [
    "🍎 Eat 5 servings of fruits and vegetables every day!",
    "💧 Drink 6-8 glasses of water daily!",
    "🏃 Exercise for at least 60 minutes a day!",
    "😴 Get 8-10 hours of sleep every night!",
    "🥗 Choose colorful foods for more nutrients!",
    "🦷 Brush your teeth twice a day!",
    "🧘 Take deep breaths when feeling stressed!",
    "👨‍👩‍👧 Eat meals together as a family!",
    "🥤 Limit sugary drinks and sodas!",
    "🎮 Take breaks from screens every hour!",
  ];

  return tips[Math.floor(Math.random() * tips.length)];
}

// ============================================
// COIN MANAGEMENT SYSTEM
// ============================================

/**
 * Get total coins available across all games
 * Can be used anywhere in the app
 */
export function getTotalCoins(): number {
  const savedCoins = localStorage.getItem("healthQuestTotalCoins");
  return savedCoins ? parseInt(savedCoins) : 0;
}

/**
 * Add coins to total (useful for other activities/games)
 */
export function addCoins(amount: number): number {
  const currentCoins = getTotalCoins();
  const newTotal = currentCoins + amount;
  localStorage.setItem("healthQuestTotalCoins", newTotal.toString());
  return newTotal;
}

/**
 * Spend coins (for shop, rewards, etc.)
 * Returns true if successful, false if not enough coins
 */
export function spendCoins(amount: number): {
  success: boolean;
  remainingCoins: number;
} {
  const currentCoins = getTotalCoins();

  if (currentCoins < amount) {
    return {
      success: false,
      remainingCoins: currentCoins,
    };
  }

  const newTotal = currentCoins - amount;
  localStorage.setItem("healthQuestTotalCoins", newTotal.toString());

  return {
    success: true,
    remainingCoins: newTotal,
  };
}

/**
 * Check if user has enough coins for a purchase
 */
export function hasEnoughCoins(amount: number): boolean {
  return getTotalCoins() >= amount;
}

/**
 * Get coin transaction history (optional - for analytics)
 */
export interface CoinTransaction {
  type: "earn" | "spend";
  amount: number;
  source: string; // "food-catch-game", "quiz", "shop", etc.
  timestamp: number;
}

/**
 * Log a coin transaction
 */
export function logCoinTransaction(transaction: CoinTransaction): void {
  const history = getCoinHistory();
  history.push(transaction);

  // Keep only last 100 transactions
  if (history.length > 100) {
    history.shift();
  }

  localStorage.setItem("healthQuestCoinHistory", JSON.stringify(history));
}

/**
 * Get coin transaction history
 */
export function getCoinHistory(): CoinTransaction[] {
  const saved = localStorage.getItem("healthQuestCoinHistory");
  return saved ? JSON.parse(saved) : [];
}

/**
 * Get coin statistics
 */
export function getCoinStats(): {
  totalCoins: number;
  totalEarned: number;
  totalSpent: number;
  lastEarned: CoinTransaction | null;
  lastSpent: CoinTransaction | null;
} {
  const history = getCoinHistory();
  const totalEarned = history
    .filter((t) => t.type === "earn")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalSpent = history
    .filter((t) => t.type === "spend")
    .reduce((sum, t) => sum + t.amount, 0);

  const earnedTransactions = history.filter((t) => t.type === "earn");
  const spentTransactions = history.filter((t) => t.type === "spend");

  return {
    totalCoins: getTotalCoins(),
    totalEarned,
    totalSpent,
    lastEarned:
      earnedTransactions.length > 0
        ? earnedTransactions[earnedTransactions.length - 1]
        : null,
    lastSpent:
      spentTransactions.length > 0
        ? spentTransactions[spentTransactions.length - 1]
        : null,
  };
}

/**
 * Reset all coins (for testing or admin)
 */
export function resetCoins(): void {
  localStorage.setItem("healthQuestTotalCoins", "0");
  localStorage.removeItem("healthQuestCoinHistory");
}

/**
 * Export coin data for use in other parts of the app
 */
export function exportCoinData(): {
  totalCoins: number;
  history: CoinTransaction[];
  stats: ReturnType<typeof getCoinStats>;
} {
  return {
    totalCoins: getTotalCoins(),
    history: getCoinHistory(),
    stats: getCoinStats(),
  };
}
