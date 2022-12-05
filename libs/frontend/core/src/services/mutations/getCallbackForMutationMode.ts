import {MutationMode, NotificationCategory, useModalStore, useNotificationStore} from '../../';

type Callback = (() => void) | undefined;

export const getCallbackForMutationMode = (mode: MutationMode): Callback => {
  switch (mode) {
    case MutationMode.MODAL:
      return () => {
        useModalStore().loading = true;
        useNotificationStore().remove(NotificationCategory.MODAL);
      };

    default:
      return undefined;
  }
};
