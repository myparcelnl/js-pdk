/* eslint-disable @typescript-eslint/no-unused-vars */
import {type MutationOptions} from '@tanstack/vue-query';
import {NotificationCategory} from '@myparcel-pdk/admin-common';
import {addErrorToNotifications, useModalStore} from '../..';

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
