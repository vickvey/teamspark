// ---------------------- Types ----------------------
export type Habit = {
  id: number;
  name: string;
  description: string;
  completed: boolean;
};

// ---------------------- Function ----------------------
export async function fetchTodayTasks(userId: string): Promise<Habit[]> {
  console.log(`Fetching today's tasks for user: ${userId}`);
  try {
    // Fetch from the public folder
    const res = await fetch("/data/habits.json", {
      cache: "no-store", // always get fresh data (optional)
    });

    if (!res.ok) {
      throw new Error(`Failed to load habits.json: ${res.status}`);
    }

    const data = await res.json();

    const dailyHabits = data.daily_habits;

    // Map habits into your Habit[] format
    const tasks: Habit[] = dailyHabits.map(
      (habit: { name: string; description: string }, index: number) => ({
        id: index + 1,
        name: habit.name,
        description: habit.description,
        completed: Math.random() < 0.3, // randomly mark some completed
      })
    );

    return tasks;
  } catch (error) {
    console.error("Error fetching daily habits:", error);
    return [];
  }
}
