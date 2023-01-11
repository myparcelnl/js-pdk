/// <reference types="jquery" />
/// <reference types="bootstrap" />

import {ModalKey, PdkConfigurationPreset, useModalStore} from '@myparcel/pdk-frontend';

export const bootstrap4Config: PdkConfigurationPreset = {
  cssUtilities: {
    textCenter: 'text-center',
  },

  /**
   * Make the modal store work with jQuery Modals.
   */
  onCreateStore: () => {
    const modalStore = useModalStore();

    modalStore.onOpen((key: ModalKey) => {
      jQuery(`#pdk-modal-${key}`).modal('show');
    });

    modalStore.onClose((key: ModalKey) => {
      jQuery(`#pdk-modal-${key}`).modal('hide');
    });
  },
};
