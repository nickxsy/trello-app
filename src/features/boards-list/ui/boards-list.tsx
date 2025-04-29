import { Link, generatePath } from 'react-router';

import { ROUTER_PATHS } from '@/shared/constants';

import { useBoards } from '@/entities/board';
import { UserPreview, useUsers } from '@/entities/user';
import { AvatarsList } from '@/entities/user';

import { useBoardsListDeps } from '../deps';

import { RemoveBoardButton } from './remove-board-button';
import { UpdateBoardButton } from './update-board-button';

const boardUrl = (boardId: string) =>
  generatePath(ROUTER_PATHS.HOME + ROUTER_PATHS.BOARD, { boardId });

export function BoardsList({ className }: { className?: string }) {
  const { canViewBoard, canRemoveBoard, canUpdateBoard } = useBoardsListDeps();
  const { boards } = useBoards();
  const users = useUsers(s => s.usersMap());

  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Все доски</h2>
      <table className="w-full">
        <tr>
          <th className="text-start">Название:</th>
          <th className="text-start">Админ:</th>
          <th className="text-start">Редакторы:</th>
        </tr>
      </table>
      <tbody>
        {boards.filter(canViewBoard).map(board => (
          <tr key={board.id}>
            <td className="p-2">
              <Link to={boardUrl(board.id)} className="text-xl text-blue-500">
                {board.title}
              </Link>
            </td>
            <td className="p-2">
              <UserPreview size="md" {...users[board.ownerId]} />
            </td>
            <td className="p-2">
              <AvatarsList
                avatarsIds={board.editorsIds.map(id => users[id].avatarId)}
              />
            </td>
            <td className="p-2">
              <div className="flex gap-2 ml-auto">
                {canUpdateBoard(board) && <UpdateBoardButton board={board} />}
                {canRemoveBoard(board) && <RemoveBoardButton board={board} />}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}
