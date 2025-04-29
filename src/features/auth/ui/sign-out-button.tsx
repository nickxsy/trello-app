import { UiButton } from '@/shared/ui';

import { useSignOut } from '../model/use-sign-out';

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
