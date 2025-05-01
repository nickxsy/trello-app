import { useMutation } from '@tanstack/react-query';

import { useInvalidateSessions } from '@/entities/session';

import { authApi } from '@/shared/api';

export function useSignOut() {
  const invalidateSession = useInvalidateSessions();

  const signOutMutation = useMutation({
    mutationFn: () => authApi.signOut(),
    async onSuccess() {
      await invalidateSession();
    }
  });

  return () => signOutMutation.mutate();
}
