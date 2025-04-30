import { useParams } from 'react-router';

import { subject, useAbility } from '@/features/auth';
import {
  Board,
  BoardActions,
  BoardSearch,
  BoardSearchProvider,
  BoardStoreProvider,
  useFetchBoard
} from '@/features/dnd-board';
import {
  BoardEditors,
  UpdateBoardAccessButton
} from '@/features/manage-board-access';

import { ComposeChildren } from '@/shared/lib';
import { UiPageSpinner } from '@/shared/ui';

import { BoardDepsProvider, TaskEditorProvider } from './board-providers';

function useBoards() {
  const params = useParams<'boardId'>();
  const { boardId } = params;
  const { board, fetchBoard } = useFetchBoard(boardId);

  return { board, fetchBoard };
}

export function BoardPage() {
  const ability = useAbility();
  const { board, fetchBoard } = useBoards();

  if (!board) {
    return <UiPageSpinner />;
  }

  const canReadBoard = ability.can('read', subject('Board', board));
  const canUpdateAccess = ability.can('update-access', subject('Board', board));

  if (!canReadBoard) {
    return <div>Не авторизован</div>;
  }

  return (
    <ComposeChildren>
      <TaskEditorProvider board={board} />
      <BoardDepsProvider />
      <BoardStoreProvider board={board} />
      <BoardSearchProvider />
      <div className="flex flex-col py-3 px-4 grow">
        <h1 className="text-3xl mb-4 shrink-0 ">{board?.title}</h1>
        <div className="flex gap-5 mb-2">
          <BoardActions />
          <BoardSearch className="w-[250px]" />
          <div className="flex items-center gap-2">
            <span>Редакторы:</span>
            <BoardEditors board={board} />
            {canUpdateAccess && (
              <UpdateBoardAccessButton
                board={board}
                onUpdate={() => {
                  fetchBoard();
                }}
              />
            )}
          </div>
        </div>
        <Board className="basis-0 grow" />
      </div>
    </ComposeChildren>
  );
}
