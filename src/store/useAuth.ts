import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  data: {
    name?: string;
    email?: string;
    favorites?: string[];
    views?: string[];
    criticas?: string[];
    cuenta?: string;
    list?: string[];
    image?: string;
  } | null;
  setData: (newData: Partial<AuthState["data"]>) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      data: { views: [], favorites: [], list: [] },
      setData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })), 
      logout: () => set({ data: { views: [], favorites: [], list: [] } }), 
    }),
    { name: "auth-storage" }
  )
);
