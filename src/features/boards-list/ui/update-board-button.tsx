import { useState } from 'react';
import clsx from 'clsx';

import { UpdateIcon } from '@/shared/ui';

import { BoardPartial } from '../model/types';

import { UpdateBoardModal } from './update-board-modal';

export function UpdateBoardButton({
  className,
  board
}: {
  className?: string;
  board: BoardPartial;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className={clsx(className)} onClick={() => setOpen(true)}>
        <UpdateIcon className="size-8 text-teal-600" />
      </button>
      {open && (
        <UpdateBoardModal board={board} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
