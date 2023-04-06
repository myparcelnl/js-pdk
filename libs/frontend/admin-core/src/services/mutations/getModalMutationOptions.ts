/* eslint-disable @typescript-eslint/no-unused-vars */
import {NotificationCategory, addErrorToNotifications, useModalStore} from '../../';
import {MutationOptions} from '@tanstack/vue-query';

export const getModalMutationOptions = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(): MutationOptions<TData, TError, TVariables, TContext> => {
  return {
    onSuccess() {
      useModalStore().close();
    },
    onSettled() {
      useModalStore().loading = false;
    },
    onError(error) {
      addErrorToNotifications(error, NotificationCategory.Modal);
    },
  };
};