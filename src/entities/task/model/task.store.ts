import { nanoid } from 'nanoid';
import { create } from 'zustand';

import { taskRepository } from './task.repository';
import { Task } from './types';

export type TaskStore = {
  tasks: Task[];
  loadTasks: () => Promise<void>;
  createTask: (data: { name: string; description?: string }) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
};

export const useTasks = create<TaskStore>(set => ({
  tasks: [],

  loadTasks: async () => {
    set({
      tasks: await taskRepository.getTasks()
    });
  },

  createTask: async data => {
    const newTask = { id: nanoid(), ...data };

    await taskRepository.addTask(newTask);

    set({
      tasks: await taskRepository.getTasks()
    });
  },

  removeTask: async (taskId: string) => {
    await taskRepository.removeTask(taskId);

    set({
      tasks: await taskRepository.getTasks()
    });
  }
}));
