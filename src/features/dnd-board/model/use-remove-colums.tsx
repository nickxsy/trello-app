import { useGetConfirmation } from '@/shared/lib';

import { BoardCol } from './types';
import { useBoardStore } from './use-board-store';

export function useRemoveColumn(col: BoardCol) {
  const getConfirmation = useGetConfirmation();
  const { removeColumn } = useBoardStore();

  return async () => {
    const confirmatin = await getConfirmation({
      title: 'Удаление колонки',
      description: 'Вы уверены, что хотите удалить эту колонку?'
    });

    if (!confirmatin) {
      return;
    }

    removeColumn(col.id);
  };
}
