/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {type EndpointResponse, type GetCarrier} from '@myparcel/sdk';
import {type CarrierName} from '@myparcel/constants';
import {useMyParcelApi} from '../useMyParcelApi';
import {QUERY_KEY_CARRIERS} from './useCarriers';

export const useCarrier = (carrier?: CarrierName) => {
  const queryClient = useQueryClient();
  const queryKey = [QUERY_KEY_CARRIERS, ...(carrier ? [carrier] : [])] as const;

  return useQuery<EndpointResponse<GetCarrier>[number]>(
    queryKey,
    async () => {
      const sdk = useMyParcelApi();
      const carriers = await sdk.getCarrier(carrier ? {path: {carrier}} : undefined);

      return carriers[0];
    },
    {
      ...queryClient.defaultQueryOptions(),
    },
  );
};
