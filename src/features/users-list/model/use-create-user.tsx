import { useMutation } from '@tanstack/react-query';
import { nanoid } from 'nanoid';

import { useInvalidateUsersList } from '@/entities/user';

import { usersApi } from '@/shared/api';

export type CreateUserFormData = {
  name: string;
  avatarId: string;
};

export function useCreateUser() {
  const invalidateUsers = useInvalidateUsersList();

  const createUserMutation = useMutation({
    mutationFn: usersApi.addUser,
    async onSettled() {
      await invalidateUsers();
    }
  });

  return (data: CreateUserFormData) => {
    createUserMutation.mutate({ ...data, id: nanoid() });
  };
}
