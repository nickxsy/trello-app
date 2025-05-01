import { useMutation } from '@tanstack/react-query';

import { useInvalidateSessions } from '@/entities/session';

import { authApi } from '@/shared/api';

export function useSignInUser() {
  const invalidateSession = useInvalidateSessions();

  const authUserMutation = useMutation({
    mutationFn: (userId: string) => authApi.signInAsUser(userId),
    async onSuccess() {
      await invalidateSession();
    }
  });

  return (userId: string) => authUserMutation.mutate(userId);
}
