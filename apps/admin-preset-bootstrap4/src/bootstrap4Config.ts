/// <reference types="jquery" />
/// <reference types="bootstrap" />

import {type AdminConfigurationPreset, type AdminModalKey, useModalStore} from '@myparcel-pdk/admin';

// noinspection JSUnusedGlobalSymbols
export const bootstrap4Config: AdminConfigurationPreset = {
  cssUtilities: {
    displayFlex: 'd-flex',
    flexGrow: 'flex-grow-1',
    marginLAuto: 'ml-auto',
    marginYAuto: 'my-auto',
    textCenter: 'text-center',
    textColorError: 'text-danger',
    textColorSuccess: 'text-success',
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
