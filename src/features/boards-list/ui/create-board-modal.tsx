import { Controller, useForm } from 'react-hook-form';

import { CreateBoardData } from '@/entities/board';
import { UserMultiSelect } from '@/entities/user';

import { UiButton, UiModal,UiTextField  } from '@/shared/ui';

import { useCreateBoard } from '../model/use-create-board';

export function CreateBoardModal({ onClose }: { onClose: () => void }) {
  const { control, handleSubmit } = useForm<CreateBoardData>({
    defaultValues: {
      title: '',
      editorsIds: []
    }
  });

  const { createBoard } = useCreateBoard();

  const onSubmit = handleSubmit(data => createBoard(data, onClose));

  return (
    <UiModal isOpen onClose={onClose} width="md">
      <form onSubmit={onSubmit}>
        <UiModal.Header>
          <h1>Создание доски</h1>
        </UiModal.Header>
        <UiModal.Body className="flex flex-col gap-4">
          <Controller
            control={control}
            name="title"
            rules={{ required: 'Название доски — обязательно поле' }}
            render={({ field, fieldState }) => (
              <UiTextField
                label="Название"
                inputProps={{ ...field }}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="editorsIds"
            render={({ field: { value, onChange }, fieldState }) => (
              <UserMultiSelect
                label="Редакторы"
                userIds={value ?? []}
                onChangeUserIds={onChange}
                error={fieldState.error?.message}
                className="w-full"
              />
            )}
          />
        </UiModal.Body>
        <UiModal.Footer>
          <UiButton type="button" variant="outlined" onClick={onClose}>
            Отмена
          </UiButton>
          <UiButton type="submit" variant="primary">
            Создать
          </UiButton>
        </UiModal.Footer>
      </form>
    </UiModal>
  );
}
