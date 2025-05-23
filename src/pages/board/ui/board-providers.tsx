import { boardDepsContext } from '@/features/dnd-board';
import { useCanUserAccessBoard } from '@/features/manage-board-access';
import {
  updateTaskModalDeps,
  useUpdateTaskModal
} from '@/features/update-task-modal';

import { BoardPartial } from '@/entities/board';
import { useSession } from '@/entities/session';
import { useTasks } from '@/entities/task';

export function TaskEditorProvider({
  children,
  board
}: {
  children?: React.ReactNode;
  board: BoardPartial;
}) {
  const canUserAccessBoard = useCanUserAccessBoard();

  return (
    <updateTaskModalDeps.Provider
      value={{
        canAssigneUserToTask: user => canUserAccessBoard(user.id, board)
      }}
    >
      {children}
    </updateTaskModalDeps.Provider>
  );
}
export function BoardDepsProvider({
  children
}: {
  children?: React.ReactNode;
}) {
  const session = useSession(s => s.currentSession);
  const removeTask = useTasks(s => s.removeTask);
  const createTask = useTasks(s => s.createTask);
  const { modal, updateTask } = useUpdateTaskModal();

  return (
    <boardDepsContext.Provider
      value={{
        createBoardCard: async (title: string) => {
          if (!session) {
            throw new Error();
          }
          return await createTask({ authorId: session?.userId, title });
        },
        onBeforeRemoveBoardCard: async (id: string) => {
          await removeTask(id);
        },
        updateBoardCard: async board => await updateTask(board.id)
      }}
    >
      {children}
      {modal}
    </boardDepsContext.Provider>
  );
}
