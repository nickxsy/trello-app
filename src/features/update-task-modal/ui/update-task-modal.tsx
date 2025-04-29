import { UiButton } from '@/shared/ui';
import { UiModal } from '@/shared/ui/ui-modal';

import { Task } from '@/entities/task';

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
        <UiModal.Body>
          <UpdateTaskForm.Fields />
        </UiModal.Body>
        <UiModal.Footer>
          <UiButton type="button" variant="outlined" onClick={() => onClose()}>
            Отмена
          </UiButton>
        </UiModal.Footer>
      </UpdateTaskForm>
    </UiModal>
  );
}
