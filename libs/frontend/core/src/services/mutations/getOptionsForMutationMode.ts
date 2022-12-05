/* eslint-disable @typescript-eslint/no-unused-vars */
import {MutationMode, NotificationCategory, addErrorToNotifications, useModalStore} from '../../';
import {MutationOptions} from '@tanstack/vue-query';

export const getOptionsForMutationMode = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  mode: MutationMode,
): MutationOptions<TData, TError, TVariables, TContext> => {
  switch (mode) {
    case MutationMode.MODAL:
      return {
        onSuccess() {
          useModalStore().close();
        },
        onSettled() {
          useModalStore().loading = false;
        },
        onError(error) {
          addErrorToNotifications(error, NotificationCategory.MODAL);
        },
      };

    default:
      return {};
  }
};
