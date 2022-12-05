/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {ApiException, Carrier, CarrierName} from '@myparcel/sdk';
import {UseQueryReturnType, useQuery, useQueryClient} from '@tanstack/vue-query';
import {useMyParcelApi} from '../useMyParcelApi';

const QUERY_KEY_CARRIERS = 'carriers';

type UseCarriers = {
  <C extends CarrierName | string>(carrier?: C): UseQueryReturnType<Carrier, ApiException>;
  (carrier?: undefined): UseQueryReturnType<Carrier[], ApiException>;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const useCarriers: UseCarriers = (carrier: CarrierName | undefined) => {
  const queryClient = useQueryClient();

  const queryKey = [QUERY_KEY_CARRIERS];

  if (carrier) {
    queryKey.push(carrier);
  }

  return useQuery(
    queryKey,
    async () => {
      const sdk = useMyParcelApi();

      if (carrier) {
        const carriers = await sdk.getCarrier({path: {carrier}});

        return carriers[0];
      }

      const allCarriers = await sdk.getCarriers();

      allCarriers.forEach((carrier) => {
        queryClient.setQueryData([QUERY_KEY_CARRIERS, carrier.name], carrier);
      });

      return allCarriers;
    },
    queryClient.defaultQueryOptions(),
  );
};
