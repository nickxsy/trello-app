import { ReactNode, useEffect, useState } from 'react';

import { UiPageSpinner } from '@/shared/ui';

import { useSesson } from '@/entities/session';
import { useUsers } from '@/entities/user';

export function AppLoader({ children }: { children?: ReactNode }) {
  const loadUsers = useUsers(s => s.loadUsers);
  const loadSession = useSesson(s => s.loadSession);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([loadSession(), loadUsers()]).finally(() => {
      setIsLoading(false);
    });
  }, [loadSession, loadUsers]);

  if (isLoading) {
    return <UiPageSpinner />;
  }

  return <>{children}</>;
}
