/* eslint-disable @typescript-eslint/no-unused-vars */
import {type MutationOptions} from '@tanstack/vue-query';
import {addErrorToNotifications} from '../addErrorToNotifications';
import {NotificationCategory} from '../../types';
import {useModalStore} from '../../stores';

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
