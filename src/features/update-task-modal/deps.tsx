import { createStrictContext } from '@/shared/lib';

import { type User } from '@/entities/user';

type UpdateTaskModalDeps = {
  canAssigneUserToTask: (user: User) => boolean;
};

export const updateTaskModalDeps = createStrictContext<UpdateTaskModalDeps>();
