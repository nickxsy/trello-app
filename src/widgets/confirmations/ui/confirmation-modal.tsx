import { UiButton,UiModal  } from '@/shared/ui';

import { ConfirmModalParams } from '../model/types';

export const ConfirmationModal = ({
  params
}: {
  params: ConfirmModalParams;
}) => (
  <UiModal isOpen onClose={params.onClose}>
    <UiModal.Header>{params.titile}</UiModal.Header>
    <UiModal.Body>{params.description}</UiModal.Body>
    <UiModal.Footer>
      <UiButton variant="outlined" onClick={params.onClose}>
        {params.closeText}
      </UiButton>
      <UiButton variant="primary" onClick={params.onConfirm}>
        {params.confirmText}
      </UiButton>
    </UiModal.Footer>
  </UiModal>
);
