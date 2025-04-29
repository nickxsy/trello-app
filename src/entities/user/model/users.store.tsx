import { nanoid } from 'nanoid';
import { create } from 'zustand';

import { CreateUserData, User } from './types';
import { usersRepository } from './users.repository';

type UsersStore = {
  users: User[];
  getUserById: (id: string) => User | undefined;
  usersMap: () => Record<string, User>;
  loadUsers: () => Promise<void>;
  createUser: (data: CreateUserData) => Promise<void>;
  removeUser: (id: string) => Promise<void>;
};

export const useUsers = create<UsersStore>((set, get) => ({
  users: [],

  loadUsers: async () => {
    set({
      users: await usersRepository.getUsers()
    });
  },

  usersMap: () => {
    return get().users.reduce(
      (acc, user) => {
        acc[user.id] = user;
        return acc;
      },
      {} as Record<string, User>
    );
  },

  getUserById: id => {
    return get().users.find(user => user.id === id);
  },

  createUser: async data => {
    const newUser = { id: nanoid(), ...data };
    await usersRepository.addUser(newUser);
    set({
      users: await usersRepository.getUsers()
    });
  },

  removeUser: async (userId: string) => {
    await usersRepository.removeUser(userId);
    set({
      users: await usersRepository.getUsers()
    });
  }
}));
