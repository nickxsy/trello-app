import { useState } from 'react';
import { create, StoreApi, UseBoundStore } from 'zustand';

import { createStrictContext, useStrictContext } from '@/shared/lib';

type BoardSearch = {
  query: string;
  setQuery: (query: string) => void;
};

export const createBoardSearch = () =>
  create<BoardSearch>(set => ({
    query: '',
    setQuery: query => set({ query })
  }));

export const searchBoardContext =
  createStrictContext<UseBoundStore<StoreApi<BoardSearch>>>();

export function BoardSearchProvider({
  children
}: {
  children?: React.ReactNode;
}) {
  const [boardSearchStore] = useState(() => createBoardSearch());

  return (
    <searchBoardContext.Provider value={boardSearchStore}>
      {children}
    </searchBoardContext.Provider>
  );
}

export const useBoardSearch = <T,>(selector: (value: BoardSearch) => T) => {
  const useSelector = useStrictContext(searchBoardContext);
  return useSelector(selector);
};
