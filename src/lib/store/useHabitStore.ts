// lib/store/useHabitStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Habit = {
  id: number;
  name: string;
  description: string;
  completed: boolean;
};

interface HabitState {
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
  toggleHabit: (id: number) => void;
  clearHabits: () => void;
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: [],
      setHabits: (habits) => set({ habits }),
      toggleHabit: (id) => {
        const habits = get().habits.map((h) =>
          h.id === id ? { ...h, completed: !h.completed } : h
        );
        set({ habits });
      },
      clearHabits: () => set({ habits: [] }),
    }),
    {
      name: "habit-storage", // key in localStorage
    }
  )
);
