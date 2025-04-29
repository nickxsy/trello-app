import { useEffect, useState } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';

import { useGetConfirmation } from '@/shared/lib/confirmation';
import { createStrictContext, useStrictContext } from '@/shared/lib/react';

import { Board, boardRepository } from '@/entities/board';

import { boardDepsContext } from '../deps';

import { BoardStore, createBoardStore } from './board.store';

export const boardStoreContext =
  createStrictContext<UseBoundStore<StoreApi<BoardStore>>>();

export const useBoardStore = () => {
  const useSelector = useStrictContext(boardStoreContext);
  return { useSelector };
};

export const useFetchBoard = (boardId?: string) => {
  const [board, setBoard] = useState<Board>();

  useEffect(() => {
    if (!boardId) {
      return;
    }
    boardRepository.getBoard(boardId).then(board => {
      if (!board) {
        return;
      }
      setBoard(board);
    });
  }, [boardId]);

  return { board };
};

export const useBoardStoreFactory = (board: Board) => {
  const getConfirmation = useGetConfirmation();
  const deps = useStrictContext(boardDepsContext);

  const [boardStore] = useState(() => {
    return createBoardStore({ board, getConfirmation, itemStore: deps });
  });

  return { boardStore };
};
