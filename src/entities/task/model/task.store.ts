import { nanoid } from 'nanoid';
import { create } from 'zustand';

import { taskRepository } from './task.repository';
import type { CreateTaskData, Task, UpdateTaskData } from './types';

export type TaskStore = {
  tasks: Task[];
  getTaskById: (id: string) => Task | undefined;
  loadTasks: () => Promise<void>;
  updateTask: (id: string, data: UpdateTaskData) => Promise<Task>;
  createTask: (data: CreateTaskData) => Promise<Task>;
  removeTask: (id: string) => Promise<void>;
  removeUserTask: (authorTask: string) => Promise<void>;
};

export const useTasks = create<TaskStore>((set, get) => ({
  tasks: [],

  getTaskById: id => get().tasks.find(task => task.id === id),

  loadTasks: async () => {
    set({
      tasks: await taskRepository.getTasks()
    });
  },

  createTask: async data => {
    const newTask = { id: nanoid(), ...data, cols: [] };
    await taskRepository.saveTask(newTask);
    set({
      tasks: await taskRepository.getTasks()
    });

    return newTask;
  },

  updateTask: async (id, data) => {
    const task = await taskRepository.getTask(id);

    if (!task) {
      throw new Error();
    }

    const newTask = { ...task, ...data };

    await taskRepository.saveTask(newTask);

    set({
      tasks: await taskRepository.getTasks()
    });

    return newTask as Task;
  },

  removeTask: async id => {
    await taskRepository.removeTask(id);

    set({
      tasks: await taskRepository.getTasks()
    });
  },

  removeUserTask: async authorId => {
    const tasksToRemove = get().tasks.filter(
      task => task.authorId === authorId
    );

    for (const task of tasksToRemove) {
      await taskRepository.removeTask(task.id);
    }
  }
}));
