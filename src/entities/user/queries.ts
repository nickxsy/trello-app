import { useQueryClient, UseQueryOptions } from '@tanstack/react-query';

import { usersApi } from '@/shared/api';

const userQueryKey = 'user';

export const usersListQuery = () =>
  ({
    queryKey: [userQueryKey, 'list'],
    queryFn: () => usersApi.getUsers()
  }) satisfies UseQueryOptions;

export const useInvalidateUsersList = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: [userQueryKey, 'list']
    });
  };
};
