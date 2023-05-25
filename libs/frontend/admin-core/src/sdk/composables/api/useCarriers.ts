/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {EndpointResponse, GetCarriers} from '@myparcel/sdk';
import {useMyParcelApi} from '../useMyParcelApi';

export const QUERY_KEY_CARRIERS = 'carriers';

export const useCarriers = () => {
  const queryClient = useQueryClient();

  return useQuery<EndpointResponse<GetCarriers>>(
    [QUERY_KEY_CARRIERS],
    async () => {
      const sdk = useMyParcelApi();

      return sdk.getCarriers();
    },
    {
      ...queryClient.defaultQueryOptions(),
      onSuccess(data) {
        data.forEach((carrier) => {
          queryClient.setQueryData([QUERY_KEY_CARRIERS, carrier.name], carrier);
        });
      },
    },
  );
};
