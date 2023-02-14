/// <reference types="jquery" />
/// <reference types="bootstrap" />

import {AdminConfigurationPreset, AdminModalKey, useModalStore} from '@myparcel-pdk/frontend-core/src';

// noinspection JSUnusedGlobalSymbols
export const bootstrap4Config: AdminConfigurationPreset = {
  cssUtilities: {
    textCenter: 'text-center',
  },

  /**
   * Make the modal store work with jQuery Modals.
   */
  onCreateStore: () => {
    const modalStore = useModalStore();

    modalStore.onOpen((key: AdminModalKey) => {
      jQuery(`#pdk-modal-${key}`).modal('show');
    });

    modalStore.onClose((key: AdminModalKey) => {
      jQuery(`#pdk-modal-${key}`).modal('hide');
    });
  },
};
