import { useParams } from 'react-router';

import { Board, BoardActions, useBoard } from '@/features/dnd-board';

import { useSession } from '@/entities/session';

import { ComposeChildren } from '@/shared/lib';
import { UiPageSpinner } from '@/shared/ui';

import {
  BoardDepsProvider,
  BoardStoreProvider,
  TaskEditorProvider
} from './providers';

export function BoardPage() {
  const params = useParams<'boardId'>();
  const { boardId } = params;
  const sesson = useSession();

  const board = useBoard(boardId);

  if (!sesson) {
    return <div>Не авторизован</div>;
  }

  if (!board) {
    return <UiPageSpinner />;
  }

  return (
    <ComposeChildren>
      <TaskEditorProvider board={board} />
      <BoardDepsProvider />
      <BoardStoreProvider board={board} />
      <div className="flex flex-col py-3 px-4 grow">
        <h1 className="text-3xl mb-4 shrink-0 ">{board?.title}</h1>
        <BoardActions className="shrink-0 mb-2" />
        <Board className="basis-0 grow" />
      </div>
    </ComposeChildren>
  );
}
