import { useQueryClient, UseQueryOptions } from '@tanstack/react-query';

import { authApi } from '@/shared/api';

const sessionQueryKey = 'session';
const staleTime = 1000 * 60 * 5;

export const sessionQuery = () =>
  ({
    queryKey: [sessionQueryKey, 'getSession'],
    queryFn: () => authApi.getSession().then(response => response ?? null),
    staleTime
  }) satisfies UseQueryOptions;

export const useInvalidateSessions = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: [sessionQueryKey]
    });
  };
};
