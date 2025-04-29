import { persistStorage } from '@/shared/lib';

import { Task } from './types';

const TASKS_STORAGE_KEY = 'tasks_storage';

export const taskRepository = {
  getTasks: async (): Promise<Task[]> => {
    return persistStorage.getItemSafe<Task[]>(TASKS_STORAGE_KEY, []);
  },

  getTask: async (id: string): Promise<Task | undefined> => {
    return persistStorage
      .getItemSafe<Task[]>(TASKS_STORAGE_KEY, [])
      .then(tasks => tasks.find(task => task.id === id));
  },

  saveTask: async (value: Task) => {
    const tasks = await taskRepository.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === value.id);

    if (taskIndex === -1) {
      tasks.push(value);
    } else {
      tasks[taskIndex] = value;
    }

    await persistStorage.setItemSafe(TASKS_STORAGE_KEY, tasks);
  },

  removeTask: async (id: string) => {
    const tasks = await taskRepository.getTasks();

    await persistStorage.setItemSafe(
      TASKS_STORAGE_KEY,
      tasks.filter(task => task.id !== id)
    );
  }
};
