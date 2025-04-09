import { ReactNode, useEffect, useState } from 'react';

import { UiPageSpinner } from '@/shared/ui';

import { useBoards } from '@/entities/board';
import { useSesson } from '@/entities/session';
import { useTasks } from '@/entities/task';
import { useUsers } from '@/entities/user';

export function AppLoader({ children }: { children?: ReactNode }) {
  const loadUsers = useUsers(s => s.loadUsers);
  const loadBoards = useBoards(s => s.loadBoards);
  const loadSession = useSesson(s => s.loadSession);
  const loadTasks = useTasks(s => s.loadTasks);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      loadSession(),
      loadUsers(),
      loadBoards(),
      loadTasks()
    ]).finally(() => {
      setIsLoading(false);
    });
  }, [loadSession, loadUsers]);

  if (isLoading) {
    return <UiPageSpinner />;
  }

  return <>{children}</>;
}
