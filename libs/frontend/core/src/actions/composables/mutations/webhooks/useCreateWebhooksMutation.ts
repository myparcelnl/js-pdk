/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {usePdkApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

export const useCreateWebhooksMutation = () => {
  const queryClient = useQueryClient();

  return usePdkMutation(BackendEndpoint.CREATE_WEBHOOKS, (input) => usePdkApi().createWebhooks({parameters: input}), {
    ...queryClient.defaultMutationOptions(),
    onSuccess: (data) => {
      queryClient.setQueryData([BackendEndpoint.FETCH_WEBHOOKS], data);
    },
  });
};
