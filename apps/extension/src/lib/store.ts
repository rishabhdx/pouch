import { create } from "zustand";

interface StoreState {
  title: string;
  setTitle: (title: string) => void;
  collection: string;
  setCollection: (collection: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
}

export const useStore = create<StoreState>(set => ({
  title: "",
  setTitle: (title: string) => set({ title }),
  collection: "All",
  setCollection: (collection: string) => set({ collection }),
  tags: [],
  setTags: (tags: string[]) => set({ tags })
}));
