import { createStrictContext } from '@/shared/lib';

import { BoardCardStore } from './model/use-board-store-factory';

type BoardDeps = BoardCardStore;

export const boardDepsContext = createStrictContext<BoardDeps>();
