import clsx from 'clsx';
import { Controller, useForm } from 'react-hook-form';

import { UiButton, UiTextField } from '@/shared/ui';

import { useTasks } from '@/entities/task';

export type CreateTaskFormData = {
  name: string;
  description?: string;
};

export function CreateTasksForm({ className }: { className?: string }) {
  const { createTask } = useTasks();
  const { control, reset, handleSubmit } = useForm<CreateTaskFormData>({
    defaultValues: {
      name: '',
      description: ''
    }
  });

  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Создать задачу</h2>

      <form
        onSubmit={handleSubmit(data => {
          createTask?.(data);
          reset();
        })}
        className={clsx('flex flex-col gap-4')}
      >
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Название задачи — обязательное поле' }}
          render={({ field, fieldState }) => (
            <UiTextField
              label="Название задачи"
              inputProps={{ ...field }}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <UiTextField label="Описание задачи" inputProps={{ ...field }} />
          )}
        />
        <UiButton variant="primary" type="submit">
          Создать
        </UiButton>
      </form>
    </div>
  );
}
