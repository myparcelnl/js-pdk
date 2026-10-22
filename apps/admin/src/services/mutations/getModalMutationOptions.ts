/* eslint-disable @typescript-eslint/no-unused-vars */
import {type MutationOptions} from '@tanstack/vue-query';
import {addErrorToNotifications} from '../addErrorToNotifications';
import {useModalStore} from '../../stores';
import {NotificationCategory} from '../../data';
import {isSameModal, keepModalToken, type ModalMutationContext} from './modalMutationToken';

/**
 * Options for a mutation that a modal starts. The callbacks only change the
 * modal when it is still the modal that started the mutation. Pass the default
 * mutation options, so their onMutate still runs.
 */
export const getModalMutationOptions = <TData = unknown, TError = unknown, TVariables = void>(
  defaultOptions: MutationOptions<TData, TError, TVariables> = {},
): MutationOptions<TData, TError, TVariables, ModalMutationContext> => ({
  onMutate: keepModalToken(defaultOptions.onMutate),
  onSuccess(data, variables, context) {
    if (isSameModal(context)) {
      useModalStore().close();
    }
  },
  onSettled(data, error, variables, context) {
    if (isSameModal(context)) {
      useModalStore().loading = false;
    }
  },
  onError(error, variables, context) {
    if (isSameModal(context)) {
      addErrorToNotifications(error, NotificationCategory.Modal);
    }
  },
});
