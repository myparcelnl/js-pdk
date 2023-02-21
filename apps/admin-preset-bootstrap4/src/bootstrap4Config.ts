/// <reference types="jquery" />
/// <reference types="bootstrap" />

import {AdminConfigurationPreset, AdminModalKey, useModalStore} from '@myparcel-pdk/frontend-core/src';

// noinspection JSUnusedGlobalSymbols
export const bootstrap4Config: AdminConfigurationPreset = {
  cssUtilities: {
    displayFlex: 'd-flex',
    marginLAuto: 'ml-auto',
    marginYAuto: 'my-auto',
    textCenter: 'text-center',
    textColorError: 'text-danger',
    textColorSuccess: 'text-success',
    whitespaceNoWrap: 'whitespace-nowrap',
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
