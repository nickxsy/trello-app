import { BoardPartial } from '@/entities/board';

import { RemoveIcon } from '@/shared/ui';

import { useRemoveBoard } from '../model/use-remove-board';

export function RemoveBoardButton({ board }: { board: BoardPartial }) {
  const removeBoard = useRemoveBoard();

  return (
    <button onClick={() => removeBoard(board)}>
      <RemoveIcon className="size-8 text-rose-500" />
    </button>
  );
}
