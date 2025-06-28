import { create } from "zustand";

interface Store {
  index: number;
  setIndex: (num: number) => void;
}

export const useStore = create<Store>((set) => ({
  index: 0,
  setIndex: (num: number) => set({ index: num }),
}));