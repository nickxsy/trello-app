import { User } from '@/entities/user';

import { createStrictContext, useStrictContext } from '@/shared/lib';

type UsersListDeps = {
  onBeforeRemoveUser: (userId: string) => Promise<void>;
  renderUserAuthAction: (user: User) => React.ReactNode;
};

export const usersListDepsContext = createStrictContext<UsersListDeps>();

export const useUsersListDeps = () => useStrictContext(usersListDepsContext);
