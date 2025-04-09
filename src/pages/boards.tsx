import { UiCetnerContentLayout } from '@/shared/ui';

import { BoardList } from '@/entities/board';

import { useCheckSingIn } from '@/features/auth/check-sign-in';
import { CreateBoardForm } from '@/features/boards/create';

export function BoardsPage() {
  const { isSignIn } = useCheckSingIn();

  const isSign = isSignIn();

  return (
    <UiCetnerContentLayout className="py-10">
      <h1 className="text-3xl ">Доски</h1>
      {isSign ? (
        <>
          <CreateBoardForm className="mt-10" />
          <BoardList />
        </>
      ) : (
        <div className="mt-10">
          <h2 className="text-lg mb-2 font-semibold">
            Войдите, чтобы создавать и просматривать доски
          </h2>
        </div>
      )}
    </UiCetnerContentLayout>
  );
}
