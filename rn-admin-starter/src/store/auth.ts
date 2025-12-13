import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

type AuthState = {
  isSignedIn: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (user: Partial<User>) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isSignedIn: false,
  user: null,
  async signIn(email, password) {
    // Mock auth. Replace with real call.
    const ok = email.length > 3 && password.length > 3;
    if (ok) {
      set({
        isSignedIn: true,
        user: {
          id: Date.now().toString(),
          name: "Admin User",
          email,
          avatarUrl: "https://i.pravatar.cc/100?img=5",
        },
      });
    }
    return ok;
  },
  signOut() {
    set({ isSignedIn: false, user: null });
  },
  async resetPassword(email) {
    // Simulate outbound email
    console.log("Reset email sent to:", email);
    return;
  },
  updateProfile(u) {
    const curr = get().user;
    if (!curr) return;
    set({ user: { ...curr, ...u } as User });
  },
}));