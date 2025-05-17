import { persistStorage } from '@/shared/lib';

import { Board, BoardPartial } from './types';

const BOARDS_STORAGE_KEY = 'boards_storage';

export const boardRepository = {
  getBoards: async (): Promise<BoardPartial[]> =>
    persistStorage.getItemSafe<Board[]>(BOARDS_STORAGE_KEY, []),

  getBoard: async (id: string): Promise<Board | undefined> =>
    persistStorage
      .getItemSafe<Board[]>(BOARDS_STORAGE_KEY, [])
      .then(boards => boards.find(board => board.id === id)),

  saveBoard: async (value: Board) => {
    const boards = await boardRepository.getBoards();
    const boardIndex = boards.findIndex(board => board.id === value.id);

    if (boardIndex === -1) {
      boards.push(value);
    } else {
      boards[boardIndex] = value;
    }

    await persistStorage.setItemSafe(BOARDS_STORAGE_KEY, boards);
  },

  removeBoard: async (boardId: string) => {
    const boards = await boardRepository.getBoards();

    await persistStorage.setItemSafe(
      BOARDS_STORAGE_KEY,
      boards.filter(board => board.id !== boardId)
    );
  }
};
