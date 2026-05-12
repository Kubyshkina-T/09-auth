import { create } from "zustand";
import type { User } from "@/types/user";

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,

  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },

  clearAuth: () => {
    set({ user: null, isAuthenticated: false });
  },
}));