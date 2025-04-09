import { persistStorage } from '@/shared/lib';

import { Board } from './types';

const BOARDS_STORAGE_KEY = 'boards_storage';

export const boardRepository = {
  getBoards: () => {
    return persistStorage.getItemSafe<Board[]>(BOARDS_STORAGE_KEY, []);
  },

  addBoard: async (value: Board) => {
    const boards = await boardRepository.getBoards();

    await persistStorage.setItemSafe(
      BOARDS_STORAGE_KEY,
      boards.concat([value])
    );
  },

  removeBoard: async (boardId: string) => {
    const boards = await boardRepository.getBoards();

    await persistStorage.setItemSafe(
      BOARDS_STORAGE_KEY,
      boards.filter(board => board.id !== boardId)
    );
  }
};
