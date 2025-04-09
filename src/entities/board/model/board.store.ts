import { nanoid } from 'nanoid';
import { create } from 'zustand';

import { boardRepository } from './board.repository';
import { Board } from './types';

type BoardStore = {
  boards: Board[];
  loadBoards: () => Promise<void>;
  createBoard: (data: { name: string }) => Promise<void>;
  removeBoard: (boardId: string) => Promise<void>;
};

export const useBoards = create<BoardStore>(set => ({
  boards: [],

  loadBoards: async () => {
    set({
      boards: await boardRepository.getBoards()
    });
  },

  createBoard: async data => {
    const newBoard = { id: nanoid(), ...data };

    await boardRepository.addBoard(newBoard);

    set({
      boards: await boardRepository.getBoards()
    });
  },

  removeBoard: async (boardId: string) => {
    await boardRepository.removeBoard(boardId);

    set({
      boards: await boardRepository.getBoards()
    });
  }
}));
