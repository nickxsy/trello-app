import { Controller, useForm } from 'react-hook-form';

import { BoardPartial, UpdateBoardData } from '@/entities/board';
import { UserMultiSelect,UserSelect  } from '@/entities/user';

import { UiButton, UiModal,UiTextField  } from '@/shared/ui';

import { useUpdateBoard } from '../model/use-update-board';

export function UpdateBoardModal({
  onClose,
  board
}: {
  onClose: () => void;
  board: BoardPartial;
}) {
  const { control, handleSubmit } = useForm<UpdateBoardData>({
    defaultValues: board
  });

  const { updateBoard } = useUpdateBoard(board);

  const onSubmit = handleSubmit(data => updateBoard(data, onClose));

  return (
    <UiModal isOpen onClose={onClose} width="md">
      <form onSubmit={onSubmit}>
        <UiModal.Header>
          <h1>Редактирование доски</h1>
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
            name="ownerId"
            rules={{ required: 'Администратор доски — обязательно поле' }}
            render={({ field: { value, onChange }, fieldState }) => (
              <UserSelect
                label="Администратор"
                userId={value}
                onChangeUserId={onChange}
                required
                error={fieldState.error?.message}
                className="w-full"
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
            Обновить
          </UiButton>
        </UiModal.Footer>
      </form>
    </UiModal>
  );
}
