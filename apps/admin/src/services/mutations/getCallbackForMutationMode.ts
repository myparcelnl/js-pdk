import {useNotificationStore} from '../../stores/useNotificationStore';
import {useModalStore} from '../../stores/useModalStore';
import {NotificationCategory} from '../../data/constants';
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
