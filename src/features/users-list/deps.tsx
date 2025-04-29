import { createStrictContext, useStrictContext } from '@/shared/lib/react';

import { User } from '@/entities/user';

type UsersListDeps = {
  onBeforeRemoveUser: (userId: string) => Promise<void>;
  renderUserAuthAction: (user: User) => React.ReactNode;
};

export const usersListDepsContext = createStrictContext<UsersListDeps>();

export const useUsersListDeps = () => useStrictContext(usersListDepsContext);
