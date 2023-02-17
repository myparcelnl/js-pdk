/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {CarrierName, EndpointResponse, GetCarrier} from '@myparcel/sdk';
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {QUERY_KEY_CARRIERS} from './useCarriers';
import {useMyParcelApi} from '../useMyParcelApi';

export const useCarrier = (carrier: CarrierName) => {
  const queryClient = useQueryClient();
  const queryKey = [QUERY_KEY_CARRIERS, carrier];

  return useQuery<EndpointResponse<GetCarrier>[number]>(
    queryKey,
    async () => {
      const sdk = useMyParcelApi();
      const carriers = await sdk.getCarrier({path: {carrier}});

      return carriers[0];
    },
    {
      ...queryClient.defaultQueryOptions(),
    },
  );
};
