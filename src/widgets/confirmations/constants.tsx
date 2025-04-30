import { ConfirmModalParams } from './model/types';

export const defaultConfirmationParams: ConfirmModalParams = {
  titile: 'Подтвердите действие',
  description: 'Вы уверены что хотите продолжить?',
  closeText: 'Отмена',
  confirmText: 'Подтвердить',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onConfirm: () => {}
};
