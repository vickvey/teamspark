import { create } from "zustand";

interface SessionState {
  sentiment: string | null;
  emotions: string[]; // list of top emotions detected
  setSentiment: (sentiment: string) => void;
  setEmotions: (emotions: string[]) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sentiment: null,
  emotions: [],
  setSentiment: (sentiment) => set({ sentiment }),
  setEmotions: (emotions) => set({ emotions }),
  clearSession: () => set({ sentiment: null, emotions: [] }),
}));
