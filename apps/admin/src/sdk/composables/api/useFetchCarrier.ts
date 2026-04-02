/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {type EndpointResponse, type GetCarrier} from '@myparcel-dev/sdk';
import {CarrierId, CarrierName, type CarrierNameOrId} from '@myparcel-dev/constants';
import {useMyParcelApi} from '../useMyParcelApi';

const KNOWN_CARRIER_NAMES = new Set<string>(Object.values(CarrierName));
const KNOWN_CARRIER_IDS = new Set<number>(
  Object.values(CarrierId).filter((value): value is number => typeof value === 'number'),
);

const resolveCarrierIdentifier = (input: string | number): CarrierNameOrId => {
  if (typeof input === 'number') {
    if (KNOWN_CARRIER_IDS.has(input)) {
      return input as CarrierNameOrId;
    }

    // eslint-disable-next-line no-console
    console.warn(`[useFetchCarrier] Unknown carrier ID "${input}", it may cause issues.`);

    return input as CarrierNameOrId;
  }

  if (KNOWN_CARRIER_NAMES.has(input)) {
    return input as CarrierNameOrId;
  }

  const normalized = input.replace(/_/g, '').toLowerCase();

  if (KNOWN_CARRIER_NAMES.has(normalized)) {
    return normalized as CarrierNameOrId;
  }

  // eslint-disable-next-line no-console
  console.warn(`[useFetchCarrier] Unknown carrier identifier "${input}", it may cause issues.`);

  // Cast input as CarrierNameOrId, even if it's not valid, to allow the query to run and return an error from the API if it's truly invalid.
  return input as CarrierNameOrId;
};

export const useFetchCarrier = (carrier?: string | number) => {
  const resolved = carrier === undefined ? undefined : resolveCarrierIdentifier(carrier);
  const queryClient = useQueryClient();
  const queryKey = ['carriers', {name: resolved}] as const;

  return useQuery<EndpointResponse<GetCarrier>[number]>(
    queryKey,
    async () => {
      const sdk = useMyParcelApi();
      const carriers = await sdk.getCarrier(resolved === undefined ? undefined : {path: {carrier: resolved}});

      return carriers[0];
    },
    {
      ...queryClient.defaultQueryOptions(),
    },
  );
};
