import clsx from 'clsx';
import { useState } from 'react';

import { UiButton } from '@/shared/ui';

import { CreateBoardModal } from './create-board-modal';

export function CreateBoardButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UiButton
        variant="primary"
        onClick={() => setOpen(true)}
        className={clsx(className)}
      >
        Новая доска
      </UiButton>
      {open && <CreateBoardModal onClose={() => setOpen(false)} />}
    </>
  );
}
