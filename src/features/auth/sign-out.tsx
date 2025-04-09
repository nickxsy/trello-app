import { UiButton } from '@/shared/ui';

import { useSesson } from '@/entities/session';

function useSignOut() {
  return useSesson(s => s.removeSession);
}

export function SignOutButton({ className }: { className?: string }) {
  const signOut = useSignOut();
  return (
    <UiButton
      className={className}
      variant="secondary"
      onClick={() => signOut()}
    >
      Выйти
    </UiButton>
  );
}
