import { BoardPartial, useBoards } from '@/entities/board';

import { useGetConfirmation } from '@/shared/lib';

import { useBoardsListDeps } from '../deps';

export function useRemoveBoard() {
  const getConfirmation = useGetConfirmation();
  const { canRemoveBoard } = useBoardsListDeps();

  const { removeBoard } = useBoards();

  return async (board: BoardPartial) => {
    const confirmation = await getConfirmation({
      description: 'Вы действительно хотите удалить доску?'
    });

    if (!confirmation || !canRemoveBoard(board)) {
      return;
    }

    removeBoard(board.id);
  };
}
