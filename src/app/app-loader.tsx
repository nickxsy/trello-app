import { ReactNode, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { boardsListQuery } from '@/entities/board';
import { sessionQuery } from '@/entities/session';
import { tasksListQuery } from '@/entities/task';
import { usersListQuery } from '@/entities/user';

import { UiPageSpinner } from '@/shared/ui';

export function AppLoader({ children }: { children?: ReactNode }) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      queryClient.prefetchQuery({
        ...boardsListQuery()
      }),
      queryClient.prefetchQuery({
        ...sessionQuery()
      }),
      queryClient.prefetchQuery({
        ...usersListQuery()
      }),
      queryClient.prefetchQuery({
        ...tasksListQuery()
      })
    ]).finally(() => {
      setIsLoading(false);
    });
  }, [queryClient]);

  if (isLoading) {
    return <UiPageSpinner />;
  }

  return <>{children}</>;
}
