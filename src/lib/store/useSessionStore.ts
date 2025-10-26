import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

interface SessionState {
  sentiment: string | null;
  emotions: string[];
  coins: number;

  setSentiment: (s: string) => void;
  setEmotions: (e: string[]) => void;
  clearSession: () => void;

  addCoins: (amount: number) => void;
  subtractCoins: (amount: number) => void;
  resetCoins: () => void;
}

// Custom typed storage wrapper
const storage: PersistStorage<SessionState> = {
  getItem: (name) => {
    if (typeof window === "undefined") return null;
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(name);
  },
};

// Detect if we are on the client
const isClient = typeof window !== "undefined";

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      sentiment: null,
      emotions: [],
      coins: 0,

      setSentiment: (s) => set({ sentiment: s }),
      setEmotions: (e) => set({ emotions: e }),
      clearSession: () => set({ sentiment: null, emotions: [], coins: 0 }),

      addCoins: (amount) =>
        set((state) => ({ coins: state.coins + Math.max(0, amount) })),
      subtractCoins: (amount) =>
        set((state) => ({ coins: Math.max(0, state.coins - amount) })),
      resetCoins: () => set({ coins: 0 }),
    }),
    {
      name: "session-storage",
      storage: isClient ? storage : undefined, // ✅ SSR-safe
    }
  )
);
