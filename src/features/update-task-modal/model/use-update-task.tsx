import { useMutation } from '@tanstack/react-query';

import { useSession } from '@/entities/session';
import { useInvalidateTasks } from '@/entities/task';

import { tasksApi } from '@/shared/api';

import { UpdateTaskFormData } from './types';

export function useUpdateTask(taskId: string) {
  const session = useSession();
  const invaliteTasks = useInvalidateTasks();

  const mutation = useMutation({
    mutationFn: tasksApi.updateTask,
    async onSettled() {
      await invaliteTasks();
    }
  });

  return (formData: UpdateTaskFormData) => {
    if (!session) {
      return;
    }

    return mutation.mutateAsync({
      id: taskId,
      ...formData
    });
  };
}
