import { useMutation } from '@tanstack/react-query';

import { useInvalidateBoardsList } from '@/entities/board';

import { boardsApi } from '@/shared/api';
import { useGetConfirmation } from '@/shared/lib';

import { useBoardsListDeps } from '../deps';

import { BoardPartial } from './types';

export function useRemoveBoard() {
  const invalidateList = useInvalidateBoardsList();

  const removeBoardMutation = useMutation({
    mutationFn: boardsApi.removeBoard,
    async onSettled() {
      await invalidateList();
    }
  });

  const getConfirmation = useGetConfirmation();
  const { canRemoveBoard } = useBoardsListDeps();

  return async (board: BoardPartial) => {
    const confirmation = await getConfirmation({
      description: 'Вы действительно хотите удалить доску?'
    });

    if (!confirmation || !canRemoveBoard(board)) {
      return;
    }

    removeBoardMutation.mutate(board.id);
  };
}
