import { nanoid } from 'nanoid';
import { create } from 'zustand';

import { boardRepository } from './board.repository';
import type {
  BoardCol,
  BoardPartial,
  CreateBoardData,
  UpdateBoardData
} from './types';

type BoardStore = {
  boards: BoardPartial[];
  getBoardById: (id: string) => BoardPartial | undefined;
  loadBoards: () => Promise<void>;
  createBoard: (data: CreateBoardData) => Promise<void>;
  updateBoard: (id: string, data: UpdateBoardData) => Promise<void>;
  removeBoard: (id: string) => Promise<void>;
  removeAuthorFromBoards: (authorId: string) => Promise<void>;
};

export const useBoards = create<BoardStore>((set, get) => ({
  boards: [],

  getBoardById: id => get().boards.find(board => board.id === id),

  loadBoards: async () => {
    set({
      boards: await boardRepository.getBoards()
    });
  },

  createBoard: async data => {
    const newBoard = { id: nanoid(), ...data, cols: [] as BoardCol[] };

    await boardRepository.saveBoard(newBoard);

    set({
      boards: await boardRepository.getBoards()
    });
  },

  updateBoard: async (id, data) => {
    const board = await boardRepository.getBoard(id);
    if (!board) {
      return;
    }

    const newBoard = { ...board, ...data };

    await boardRepository.saveBoard(newBoard);

    set({
      boards: await boardRepository.getBoards()
    });
  },

  removeBoard: async id => {
    await boardRepository.removeBoard(id);

    set({
      boards: await boardRepository.getBoards()
    });
  },

  removeAuthorFromBoards: async authorId => {
    for (const board of get().boards) {
      const newBoard = {
        ...board,
        editorsIds: board.editorsIds.filter(id => id !== authorId)
      };

      if (newBoard.ownerId === authorId) {
        await get().removeBoard(newBoard.id);
      } else {
        await get().updateBoard(newBoard.id, newBoard);
      }
    }
  }
}));
