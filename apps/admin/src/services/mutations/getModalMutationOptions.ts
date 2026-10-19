/* eslint-disable @typescript-eslint/no-unused-vars */
import {type MutationOptions} from '@tanstack/vue-query';
import {addErrorToNotifications} from '../addErrorToNotifications';
import {useModalStore, useNotificationStore} from '../../stores';
import {NotificationCategory} from '../../data';

export const getModalMutationOptions = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(): MutationOptions<TData, TError, TVariables, TContext> => {
  // Taken now, in setup: the callbacks run after the request, when the active
  // Pinia can already belong to a newer admin instance.
  const modalStore = useModalStore();
  const notificationStore = useNotificationStore();

  return {
    onSuccess() {
      modalStore.close();
    },
    onSettled() {
      modalStore.loading = false;
    },
    onError(error) {
      addErrorToNotifications(error, NotificationCategory.Modal, false, notificationStore);
    },
  };
};
