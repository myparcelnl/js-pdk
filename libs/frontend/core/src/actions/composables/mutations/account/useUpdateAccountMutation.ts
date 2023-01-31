/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName} from '@myparcel-pdk/common';
import {QUERY_KEY_ACCOUNT} from '../../queries';
import {formToBody} from '../../../../utils';
import {usePdkApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

export const useUpdateAccountMutation = () => {
  const queryClient = useQueryClient();

  return usePdkMutation(
    EndpointName.UPDATE_ACCOUNT,
    ({form}) => {
      const pdk = usePdkApi();

      return pdk.updateAccount({
        // @ts-expect-error custom endpoints are not typed correctly
        body: formToBody(form),
      });
    },
    {
      ...queryClient.defaultMutationOptions(),
      onSuccess: (data) => {
        queryClient.setQueryData([QUERY_KEY_ACCOUNT], data);
      },
    },
  );
};
