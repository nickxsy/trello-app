import { Task } from '@/entities/task';

import { UiButton, UiModal } from '@/shared/ui';

import { UpdateTaskForm } from './update-task-form';

export function UpdateTaskModal({
  onClose,
  taskId
}: {
  onClose: (task?: Task) => void;
  taskId: string;
}) {
  return (
    <UiModal isOpen onClose={onClose} width="md">
      <UpdateTaskForm onSuccess={onClose} taskId={taskId}>
        <UiModal.Header>
          <h1>Редактирование задачи</h1>
        </UiModal.Header>
        <UiModal.Body className="flex flex-col gap-4">
          <UpdateTaskForm.Fields />
        </UiModal.Body>
        <UiModal.Footer>
          <UiButton type="button" variant="outlined" onClick={() => onClose()}>
            Отмена
          </UiButton>
          <UpdateTaskForm.SubmitButton />
        </UiModal.Footer>
      </UpdateTaskForm>
    </UiModal>
  );
}
