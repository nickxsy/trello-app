import clsx from 'clsx';
import { Controller, useForm } from 'react-hook-form';

import { UiButton, UiTextField } from '@/shared/ui';

import { useBoards } from '@/entities/board';

export type CreateBoardFormData = {
  name: string;
};

export function CreateBoardForm({ className }: { className?: string }) {
  const { createBoard } = useBoards();
  const { control, reset, handleSubmit } = useForm<CreateBoardFormData>({
    defaultValues: {
      name: ''
    }
  });

  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Создать доску</h2>
      <form
        onSubmit={handleSubmit(data => {
          createBoard?.(data);
          reset();
        })}
        className={clsx('flex flex-col gap-4')}
      >
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Название доски — обязательное поле' }}
          render={({ field, fieldState }) => (
            <UiTextField
              label="Название доски"
              inputProps={{ ...field }}
              error={fieldState.error?.message}
            />
          )}
        />

        <UiButton variant="primary" type="submit">
          Создать
        </UiButton>
      </form>
    </div>
  );
}
