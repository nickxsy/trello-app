import { type User } from '@/entities/user';

import { createStrictContext } from '@/shared/lib';

type UpdateTaskModalDeps = {
  canAssigneUserToTask: (user: User) => boolean;
};

export const updateTaskModalDeps = createStrictContext<UpdateTaskModalDeps>();
