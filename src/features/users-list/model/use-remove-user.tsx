import { useMutation } from '@tanstack/react-query';

import { useInvalidateSessions } from '@/entities/session';
import { useInvalidateUsersList } from '@/entities/user';

import { usersApi } from '@/shared/api';
import { useGetConfirmation } from '@/shared/lib';

export function useRemoveUser() {
  const invalidateUsers = useInvalidateUsersList();
  const invalidateSession = useInvalidateSessions();

  const removeUserMutation = useMutation({
    mutationFn: usersApi.removeUser,
    async onSettled() {
      await invalidateSession();
      await invalidateUsers();
    }
  });

  const getConfirmation = useGetConfirmation();

  return async (userId: string) => {
    const confirmation = await getConfirmation({
      description: 'Вы действительно хотите удалить пользователя?'
    });

    if (!confirmation) {
      return;
    }

    await removeUserMutation.mutateAsync(userId);
  };
}
