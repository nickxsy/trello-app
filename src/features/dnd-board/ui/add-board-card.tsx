import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { UiTextField } from '@/shared/ui';

import { useBoardStore } from '../model/use-board-store';

export function AddBoardCard({ colId }: { colId: string }) {
  const [create, setCreate] = useState(false);
  const boardStore = useBoardStore();
  const addCard = boardStore.useSelector(s => s.addBoardCard);
  const { register, handleSubmit, reset } = useForm<{ title: string }>({});

  if (!create) {
    return (
      <button
        className="h-10 p-2  hover:bg-teal-100/40 rounded flex items-center justify-center w-full "
        type="button"
        onClick={() => setCreate(true)}
      >
        Добавить +
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(data => {
        addCard(colId, data.title);
        reset();
      })}
    >
      <UiTextField
        inputProps={{
          autoFocus: true,
          placeholder: 'Новая карточка',
          ...register('title', {
            onBlur: () => setCreate(false)
          })
        }}
      />
    </form>
  );
}
