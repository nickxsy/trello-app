import { createStrictContext } from '@/shared/lib';

type UpdateTaskModalDeps = {
  canAssigneUserToTask: (user: { id: string }) => boolean;
};

export const updateTaskModalDeps = createStrictContext<UpdateTaskModalDeps>();
