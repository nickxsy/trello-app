import { persistStorage } from '@/shared/lib';

import { Session } from './types';

const SESSION_STORAGE_KEY = 'session_storage';

export const sessionRepository = {
  getSession: () =>
    persistStorage.getItemSafe<Session | undefined>(
      SESSION_STORAGE_KEY,
      undefined
    ),

  saveSession: (value: Session) =>
    persistStorage.setItemSafe(SESSION_STORAGE_KEY, value),

  clearSession: () => persistStorage.setItemSafe(SESSION_STORAGE_KEY, undefined)
};
