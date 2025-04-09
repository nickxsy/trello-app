import { UiButton } from '@/shared/ui';

import { useSesson } from '@/entities/session';
import { User } from '@/entities/user';

function useSignInUser() {
  const createSession = useSesson(s => s.createSession);

  return (user: User) => {
    createSession({
      userId: user.id,
      ...user
    });
  };
}

export function SignInUserButton({
  className,
  user
}: {
  className?: string;
  user: User;
}) {
  const singInUser = useSignInUser();
  return (
    <UiButton
      className={className}
      variant="primary"
      onClick={() => singInUser(user)}
    >
      Войти как
    </UiButton>
  );
}
