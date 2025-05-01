import { useMutation } from '@tanstack/react-query';

import { useInvalidateBoardsList } from '@/entities/board';
import { useSession } from '@/entities/session';

import { boardsApi } from '@/shared/api';

import { useBoardsListDeps } from '../deps';

import { CreateBoardFormData } from './types';

export function useCreateBoard() {
  const invalidateList = useInvalidateBoardsList();
  const session = useSession();

  const createBoardMutation = useMutation({
    mutationFn: boardsApi.createBoard,
    async onSettled() {
      await invalidateList();
    }
  });

  const { canCreateBoard } = useBoardsListDeps();

  const createBoard = async (
    data: CreateBoardFormData,
    onCreate: () => void
  ) => {
    if (!canCreateBoard() || !session?.userId) {
      return;
    }

    createBoardMutation.mutate(
      { ...data, ownerId: session.userId },
      {
        onSuccess: () => onCreate()
      }
    );
  };

  return { createBoard };
}
