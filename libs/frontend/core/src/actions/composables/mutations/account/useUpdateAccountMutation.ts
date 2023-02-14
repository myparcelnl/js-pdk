/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {formToBody} from '../../../../utils';
import {usePdkAdminApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

export const useUpdateAccountMutation = () => {
  const queryClient = useQueryClient();

  return usePdkMutation(
    BackendEndpoint.UPDATE_ACCOUNT,
    ({form}) => {
      const pdk = usePdkAdminApi();

      return pdk.updateAccount({
        // @ts-expect-error custom endpoints are not typed correctly
        body: formToBody(form),
      });
    },
    {
      ...queryClient.defaultMutationOptions(),
      onSuccess: (data) => {
        // queryClient.setQueryData([QUERY_KEY_CONTEXT], data);
      },
    },
  );
};
