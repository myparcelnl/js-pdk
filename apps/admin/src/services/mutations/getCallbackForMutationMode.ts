import {useModalStore, useNotificationStore} from '../../stores';
import {NotificationCategory} from '../../data';
import {MutationMode} from './mutationMode';

type Callback = (() => void) | undefined;

/**
 * Call it in setup: it takes the stores of the current admin instance now, not
 * when the returned callback runs.
 */
export const getCallbackForMutationMode = (mode: MutationMode): Callback => {
  switch (mode) {
    case MutationMode.Modal: {
      const modalStore = useModalStore();
      const notificationStore = useNotificationStore();

      return () => {
        modalStore.loading = true;
        notificationStore.remove(NotificationCategory.Modal);
      };
    }

    default:
      return undefined;
  }
};
