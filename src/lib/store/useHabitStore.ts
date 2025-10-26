// lib/store/useHabitStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Habit = {
  id: number;
  name: string;
  description?: string;
  completed: boolean;
};

interface HabitState {
  habits: Habit[];
  hydrated: boolean;
  setHabits: (habits: Habit[]) => void;
  toggleHabit: (id: number) => void;
  clearHabits: () => void;
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: [],
      hydrated: false,
      setHabits: (habits) => set({ habits }),
      toggleHabit: (id) => {
        const updated = get().habits.map((h) =>
          h.id === id ? { ...h, completed: !h.completed } : h
        );
        set({ habits: updated });
      },
      clearHabits: () => set({ habits: [] }),
    }),
    {
      name: "habit-storage", // localStorage key
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    }
  )
);
