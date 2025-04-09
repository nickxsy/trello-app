import { ReactNode } from 'react';

import { useBoards } from '../model/board.store';
import { Board } from '../model/types';

export function BoardList({
  boardActions
}: {
  boardActions?: (board: Board) => ReactNode;
}) {
  const { boards } = useBoards();

  console.log(boards);

  return (
    <div className="mt-10">
      <h2 className="text-lg mb-2 font-semibold">Все доски</h2>
      <div>
        {boards.map(board => (
          <div
            key={board.id}
            className="px-5 py-2 border-b border-b-slate-3 flex gap-2 items-center "
          >
            <div className="text-lg">{board.name}</div>
            <div>{boardActions?.(board)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
