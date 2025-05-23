import { createStrictContext } from '@/shared/lib';

import { BoardCardStore } from './model/board.store';

type BoardDeps = BoardCardStore;

export const boardDepsContext = createStrictContext<BoardDeps>();
