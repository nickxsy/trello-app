import { Controller, useForm } from 'react-hook-form';

import { UiButton , UiModal , UiTextField } from '@/shared/ui';

import { useBoardStore } from '../../model/use-board-store';

export function UpdateColumnModal({
  onClose,
  columnId
}: {
  columnId: string;
  onClose: () => void;
}) {
  const boardStore = useBoardStore();

  const col = boardStore.useSelector(s =>
    s.board.cols.find(c => c.id === columnId)
  );
  const updateColumn = useBoardStore().useSelector(s => s.updateColumn);

  const { control, handleSubmit } = useForm<{ title: string }>({
    defaultValues: {
      title: col?.title
    }
  });

  const onSubmit = handleSubmit(async data => {
    await updateColumn(columnId, data.title);
    onClose();
  });

  return (
    <UiModal isOpen onClose={onClose} width="md">
      <form onSubmit={onSubmit} className="flex flex-col grow">
        <UiModal.Header>
          <h1>Добавление колонки</h1>
        </UiModal.Header>
        <UiModal.Body className="flex flex-col gap-4">
          <Controller
            control={control}
            name="title"
            rules={{ required: 'Название колонки - обязательное поле' }}
            render={({ field, fieldState }) => (
              <UiTextField
                label="Название"
                inputProps={{ ...field }}
                error={fieldState.error?.message}
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
