import { useCallback, useEffect, useState } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';

import { type Board, boardRepository } from '@/entities/board';

import {
  createStrictContext,
  useGetConfirmation,
  useStrictContext
} from '@/shared/lib';

import { boardDepsContext } from '../deps';

import { BoardStore, createBoardStore } from './board.store';

export const boardStoreContext =
  createStrictContext<UseBoundStore<StoreApi<BoardStore>>>();

export function BoardStoreProvider({
  children,
  board
}: {
  children?: React.ReactNode;
  board: Board;
}) {
  const getConfirmation = useGetConfirmation();
  const deps = useStrictContext(boardDepsContext);

  const [boardStore] = useState(() =>
    createBoardStore({ board, getConfirmation, itemStore: deps })
  );

  return (
    <boardStoreContext.Provider value={boardStore}>
      {children}
    </boardStoreContext.Provider>
  );
}

export const useBoardStore = () => {
  const useSelector = useStrictContext(boardStoreContext);
  return { useSelector };
};

export const useFetchBoard = (boardId?: string) => {
  const [board, setBoard] = useState<Board>();

  const fetchBoard = useCallback(() => {
    if (!boardId) {
      return;
    }
    boardRepository.getBoard(boardId).then(data => {
      if (!data) {
        return;
      }
      setBoard(data);
    });
  }, [boardId]);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  return { board, fetchBoard };
};

export const useBoardStoreFactory = (board: Board) => {
  const getConfirmation = useGetConfirmation();
  const deps = useStrictContext(boardDepsContext);

  const [boardStore] = useState(() =>
    createBoardStore({ board, getConfirmation, itemStore: deps })
  );

  return { boardStore };
};
