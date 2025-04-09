import { UiCetnerContentLayout } from '@/shared/ui';

import { TasksList } from '@/entities/task';

import { useCheckSingIn } from '@/features/auth/check-sign-in';
import { CreateTasksForm } from '@/features/tasks/create';

export function TasksPage() {
  const { isSignIn } = useCheckSingIn();

  const isSign = isSignIn();

  return (
    <UiCetnerContentLayout className="py-10">
      <h1 className="text-3xl ">Задачи</h1>

      {isSign ? (
        <>
          <CreateTasksForm className="mt-10" />
          <TasksList />
        </>
      ) : (
        <div className="mt-10">
          <h2 className="text-lg mb-2 font-semibold">
            Войдите, чтобы создавать задачи
          </h2>
        </div>
      )}
    </UiCetnerContentLayout>
  );
}
