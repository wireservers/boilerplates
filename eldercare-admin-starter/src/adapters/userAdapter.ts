import { User, UserInput } from '../types/models';
import { mockUsers } from '../data/mockUsers';

let users = [...mockUsers];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getUsers(): Promise<User[]> {
  await delay(100);
  return [...users];
}

export async function createUser(input: UserInput): Promise<User> {
  await delay(100);
  const user: User = {
    id: Date.now().toString(),
    ...input,
  };
  users.push(user);
  return user;
}

export async function updateUser(id: string, input: UserInput): Promise<User> {
  await delay(100);
  let updated: User | undefined;

  users = users.map((u) => {
    if (u.id === id) {
      updated = { ...u, ...input, id };
      return updated;
    }
    return u;
  });

  if (!updated) {
    throw new Error('User not found');
  }

  return updated;
}

export async function deleteUser(id: string): Promise<void> {
  await delay(80);
  users = users.filter((u) => u.id !== id);
}
