import { CreateUserForm, UsersList } from '@/features/users-list';

import { UiCenterContentLayout } from '@/shared/ui';

import { UsersPageProviers } from './users-providers';

export function UsersPage() {
  return (
    <UsersPageProviers>
      <UiCenterContentLayout className="py-10">
        <h1 className="text-3xl ">Пользователи</h1>
        <CreateUserForm />
        <h2 className="text-lg mb-2 font-semibold mt-10">Все пользователи</h2>
        <UsersList />
      </UiCenterContentLayout>
    </UsersPageProviers>
  );
}
