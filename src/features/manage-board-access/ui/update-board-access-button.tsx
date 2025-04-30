import { useState } from 'react';
import clsx from 'clsx';

import { UpdateIcon } from '@/shared/ui';

import { BoardAccessInfo } from '../model/types';

import { UpdateBoardAccessModal } from './update-board-access-modal';

export function UpdateBoardAccessButton({
  className,
  board,
  onUpdate,
}: {
  className?: string;
  board: BoardAccessInfo;
  onUpdate: () => void
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className={clsx(className)} onClick={() => setOpen(true)}>
        <UpdateIcon className="size-8 text-teal-600" />
      </button>
      {open && (
        <UpdateBoardAccessModal onUpdate={
          () => { 
            setOpen(false)
            onUpdate()
          }
        } board={board} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
