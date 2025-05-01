import { useMutation } from '@tanstack/react-query';

import { useInvalidateBoardsList } from '@/entities/board';
import { useSession } from '@/entities/session';

import { boardsApi } from '@/shared/api';
import { useGetConfirmation } from '@/shared/lib';

import { useBoardsListDeps } from '../deps';

import { BoardPartial, UpdateBoardFormData } from './types';

export function useUpdateBoard(board?: BoardPartial) {
  const getConfirmation = useGetConfirmation();

  const { canUpdateBoard } = useBoardsListDeps();

  const invalidateList = useInvalidateBoardsList();

  const session = useSession();

  const updateBoardMutation = useMutation({
    mutationFn: boardsApi.updateBoard,
    async onSettled() {
      await invalidateList();
    }
  });

  const updateBoard = async (
    data: UpdateBoardFormData,
    onUpdate: () => void
  ) => {
    if (!board || !canUpdateBoard(board)) {
      return;
    }

    if (session?.userId !== data.ownerId) {
      const confirmation = await getConfirmation({
        description:
          'Вы действительно хотите передать доску другому пользователю?'
      });

      if (!confirmation) {
        return;
      }
    }

    updateBoardMutation.mutate(
      {
        id: board.id
      },
      {
        onSuccess: () => onUpdate()
      }
    );
  };

  return { updateBoard };
}
