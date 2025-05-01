import { useQueryClient, UseQueryOptions } from '@tanstack/react-query';

import { tasksApi } from '@/shared/api';

const taskQueryKey = 'task';

export const tasksListQuery = () =>
  ({
    queryKey: [taskQueryKey, 'list'],
    queryFn: () => tasksApi.getTasks()
  }) satisfies UseQueryOptions;

export const taskByIdQuery = (id: string) =>
  ({
    queryKey: [taskQueryKey, 'byId', id],
    queryFn: () => tasksApi.getTask(id).then(response => response ?? null)
  }) satisfies UseQueryOptions;

export const useInvalidateTasks = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: [taskQueryKey, 'list']
    });
  };
};
