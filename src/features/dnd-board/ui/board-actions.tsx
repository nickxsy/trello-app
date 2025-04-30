import { useState } from 'react';
import clsx from 'clsx';

import { UiButton } from '@/shared/ui';

import { AddColumnModal } from './modals/add-column-modal';

export function BoardActions({ className }: { className?: string }) {
  const [addColumnModalOpen, setAddColumnModalOpen] = useState(false);

  return (
    <div className={clsx('flex gap-2', className)}>
      <UiButton variant="primary" onClick={() => setAddColumnModalOpen(true)}>
        Добавить колонку
      </UiButton>
      {addColumnModalOpen && (
        <AddColumnModal onClose={() => setAddColumnModalOpen(false)} />
      )}
    </div>
  );
}
