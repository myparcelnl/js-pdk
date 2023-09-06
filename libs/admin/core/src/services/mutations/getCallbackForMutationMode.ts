import {NotificationCategory} from '@myparcel-pdk/admin-common';
import {MutationMode, useModalStore, useNotificationStore} from '../..';

type Callback = (() => void) | undefined;

export const getCallbackForMutationMode = (mode: MutationMode): Callback => {
  switch (mode) {
    case MutationMode.Modal:
      return () => {
        useModalStore().loading = true;
        useNotificationStore().remove(NotificationCategory.Modal);
      };

    default:
      return undefined;
  }
};
