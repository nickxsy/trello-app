import { useQueryClient, UseQueryOptions } from '@tanstack/react-query';

import { boardsApi } from '@/shared/api';

const boardQueryKey = 'board';

export const boardsListQuery = () =>
  ({
    queryKey: [boardQueryKey, 'list'],
    queryFn: () => boardsApi.getBoards()
  }) satisfies UseQueryOptions;

export const boardByIdQuery = (id: string) =>
  ({
    queryKey: [boardQueryKey, 'byId', id],
    queryFn: () => boardsApi.getBoard(id).then(response => response ?? null)
  }) satisfies UseQueryOptions;

export const useInvalidateBoardsList = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: [boardQueryKey, 'list']
    });
  };
};
