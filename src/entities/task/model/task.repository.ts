import { persistStorage } from '@/shared/lib';

import { Task } from './types';

const TASKS_STORAGE_KEY = 'tasks_storage';

export const taskRepository = {
  getTasks: () => {
    return persistStorage.getItemSafe<Task[]>(TASKS_STORAGE_KEY, []);
  },

  addTask: async (value: Task) => {
    const tasks = await taskRepository.getTasks();

    await persistStorage.setItemSafe(TASKS_STORAGE_KEY, tasks.concat([value]));
  },

  removeTask: async (taskId: string) => {
    const tasks = await taskRepository.getTasks();

    await persistStorage.setItemSafe(
      TASKS_STORAGE_KEY,
      tasks.filter(task => task.id !== taskId)
    );
  }
};
