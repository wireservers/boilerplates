import { create } from "zustand";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["Admin", "Editor", "Viewer"]),
  active: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;

type UsersState = {
  items: User[];
  fetchUsers: () => Promise<void>;
  createUser: (input: Omit<User, "id">) => Promise<User>;
  updateUser: (id: string, input: Partial<User>) => Promise<User | null>;
  deleteUser: (id: string) => Promise<boolean>;
  getById: (id: string) => User | undefined;
};

function newId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export const useUsersStore = create<UsersState>((set, get) => ({
  items: [
    { id: "u1", name: "Jane Smith", email: "jane@corp.com", role: "Admin", active: true },
    { id: "u2", name: "Mike Chen", email: "mike@corp.com", role: "Editor", active: true },
    { id: "u3", name: "Ava Patel", email: "ava@corp.com", role: "Viewer", active: false },
  ],
  async fetchUsers() {
    // Replace with API call
    return;
  },
  async createUser(input) {
    const user: User = { id: newId(), ...input };
    set({ items: [user, ...get().items] });
    return user;
  },
  async updateUser(id, input) {
    const items = get().items.map(u => (u.id === id ? { ...u, ...input } : u));
    set({ items });
    return items.find(u => u.id === id) ?? null;
  },
  async deleteUser(id) {
    set({ items: get().items.filter(u => u.id != id) });
    return true;
  },
  getById(id) {
    return get().items.find(u => u.id === id);
  },
}));