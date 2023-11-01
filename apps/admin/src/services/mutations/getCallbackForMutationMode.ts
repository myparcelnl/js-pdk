import {NotificationCategory} from '../../types';
import {useModalStore, useNotificationStore} from '../../stores';
import {MutationMode} from './mutationMode';

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
