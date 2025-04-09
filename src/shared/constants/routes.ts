export const ROUTER_PATHS = {
  HOME: '/',
  BOARD: 'board/:boardId',
  TASKS: 'tasks',
  BOARDS: 'board',
  USERS: 'user'
} as const;

export type RouterPathsType = (typeof ROUTER_PATHS)[keyof typeof ROUTER_PATHS];
