import { useMutation } from '@tanstack/react-query';

import { useInvalidateTasks } from '@/entities/task';

import { tasksApi } from '@/shared/api';

export function useRemoveBoardCard() {
  const invaliateTasks = useInvalidateTasks();

  const removeTaskMutation = useMutation({
    mutationFn: tasksApi.removeTask,
    onSettled: async () => {
      await invaliateTasks();
    }
  });

  return (boardCardId: string) => {
    removeTaskMutation.mutateAsync(boardCardId);
  };
}
