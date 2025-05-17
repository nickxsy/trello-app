import { Controller, useForm } from 'react-hook-form';

import { UserMultiSelect, UserSelect } from '@/entities/user';

import { UiButton, UiModal } from '@/shared/ui';

import { BoardAccessInfo } from '../model/types';
import { UpdateBoardAccessData, useUpdateBoardAccess } from '../model/use-update-board-access';


export function UpdateBoardAccessModal({
  onClose,
  board,
  onUpdate
}: {
  onClose: () => void;
  board: BoardAccessInfo;
  onUpdate: () => void
}) {
  const { control, handleSubmit } = useForm<UpdateBoardAccessData>({
    defaultValues: board
  });

  const updateBoardAccess = useUpdateBoardAccess(board.id);

  const onSubmit = handleSubmit(data => updateBoardAccess(data, onUpdate));

  return (
    <UiModal isOpen onClose={onClose} width="md">
      <form onSubmit={onSubmit}>
        <UiModal.Header>
          <h1>Управление доступом</h1>
        </UiModal.Header>
        <UiModal.Body className="flex flex-col gap-4">
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
                label="Выберите редакторов"
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
