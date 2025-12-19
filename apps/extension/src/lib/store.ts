import { create } from "zustand";
import { type Tag, type Collection } from "@pouch/db/schema";

export interface StoreCollectionType {
  name: string;
  slug: string;
  id: string;
  description: string | null;
}
// export interface StoreTagType {
//   name: string;
//   id: string;
//   asd: Omit<Tag, "userId">;
// }

export type StoreTagType = Pick<Tag, "id" | "name" | "slug">;

interface StoreState {
  title: string;
  setTitle: (title: string) => void;
  collection: StoreCollectionType;
  setCollection: (collection: StoreCollectionType) => void;
  tags: StoreTagType[];
  setTags: (tags: StoreTagType[]) => void;
}

export const useStore = create<StoreState>(set => ({
  title: "",
  setTitle: (title: string) => set({ title }),
  collection: { id: "all", name: "All", slug: "all", description: null },
  setCollection: (collection: StoreCollectionType) => set({ collection }),
  tags: [],
  setTags: (tags: StoreTagType[]) => set({ tags })
}));
