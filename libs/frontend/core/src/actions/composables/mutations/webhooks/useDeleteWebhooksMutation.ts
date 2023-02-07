/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName} from '@myparcel-pdk/common/src';
import {usePdkApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

export const useDeleteWebhooksMutation = () => {
  const queryClient = useQueryClient();

  return usePdkMutation(EndpointName.DELETE_WEBHOOKS, (input) => usePdkApi().deleteWebhooks({parameters: input}), {
    ...queryClient.defaultMutationOptions(),
    onSuccess: (data) => {
      queryClient.setQueryData([EndpointName.FETCH_WEBHOOKS], data);
    },
  });
};
