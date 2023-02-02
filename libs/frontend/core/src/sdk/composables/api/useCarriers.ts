/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {useMyParcelApi} from '../useMyParcelApi';

export const QUERY_KEY_CARRIERS = 'carriers';

export const useCarriers = () => {
  const queryClient = useQueryClient();

  return useQuery(
    [QUERY_KEY_CARRIERS],
    async () => {
      const sdk = useMyParcelApi();

      return sdk.getCarriers();
    },
    {
      ...queryClient.defaultQueryOptions(),
      onSuccess(data) {
        // @ts-expect-error TODO: fix this
        data.forEach((carrier) => {
          queryClient.setQueryData([QUERY_KEY_CARRIERS, carrier.name], carrier);
        });
      },
    },
  );
};
