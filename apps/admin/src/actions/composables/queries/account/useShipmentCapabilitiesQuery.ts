import {computed, type Ref} from 'vue';
import {useQuery} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-dev/pdk-common';
import {type ProxyCapabilitiesBody, type ProxyCapabilitiesCall} from '../../../../types';
import {type ResolvedQuery} from '../../../../stores';
import {globalLogger} from '../../../../services';
import {usePdkAdminApi} from '../../../../sdk';

/**
 * The form-facing selection input — flat fields the form already has. The composable maps this
 * to the actual capabilities API request body shape (`recipient`, `physicalProperties`, …) at
 * the call site so consumers don't need to know the API's nesting conventions. Every field is
 * optional because the form may not have all values yet; the query gates on `cc` via `enabled`
 * and only fires once a destination is known. The shipment query also requires `carrier`,
 * `packageType` AND `deliveryType` to be set before firing — anything less wouldn't yield
 * shipment-specific metadata.
 *
 * `options` and `filterSupported` are intentionally not part of the selection: option toggles
 * don't drive refetches (option interactions resolve client-side), and the composable always
 * opts in to server-side allowlist filtering via the `filterSupported` query parameter.
 */
export type CapabilitiesSelection = {
  cc?: string;
  weight?: number;
  isBusiness?: boolean;
  carrier?: string;
  packageType?: string;
  deliveryType?: string;
};

/**
 * Shipment-scoped capabilities query — fires the shared CapabilitiesAction with the FULL
 * selection (carrier + packageType + deliveryType + cc + weight) and returns the matching
 * carrier entry (the one shipment configuration the user has chosen). Drives the option panel
 * and acts as the invalid-combo signal: when `results` is empty, the chosen combination isn't
 * valid for the order context.
 *
 * The selection ref is the only refetch trigger — no window-focus, mount, or reconnect refetches.
 * Server-side option filtering is opted in via the `filterSupported` query parameter so admin sees
 * the same option allowlist that `Carrier::attributesToArray` applies on the contract-definition
 * path.
 *
 * Errors are logged via `globalLogger.error` so we have a breadcrumb for support, but we
 * deliberately don't surface a user-facing toast — an intermittent capabilities failure
 * shouldn't block the form, and the auto-clear treats the errored state as still-loading.
 *
 * The selection ref is accepted as `Readonly<Ref>` because callers typically pass the
 * debounced ref from `refDebounced`, which is read-only — and the composable never mutates
 * the selection internally.
 */
export const useShipmentCapabilitiesQuery = (
  selection: Readonly<Ref<CapabilitiesSelection>>,
): ResolvedQuery<BackendEndpoint.ProxyCapabilities> => {
  const enabled = computed(() =>
    Boolean(
      selection.value.cc && selection.value.carrier && selection.value.packageType && selection.value.deliveryType,
    ),
  );
  const queryKey = computed(() => [BackendEndpoint.ProxyCapabilities, 'shipment', selection.value] as const);

  return useQuery(
    queryKey,
    async () => {
      const {cc, weight, isBusiness, carrier, packageType, deliveryType} = selection.value;

      // The `enabled` gate guarantees these are all present when this runs; TypeScript can't
      // see through the runtime check, so we narrow explicitly here.
      if (!cc || !carrier || !packageType || !deliveryType) return [];

      const pdk = usePdkAdminApi();
      const proxyCapabilities = pdk.proxyCapabilities as unknown as ProxyCapabilitiesCall;

      const body: ProxyCapabilitiesBody = {
        recipient: {countryCode: cc, ...(isBusiness === undefined ? null : {isBusiness})},
        // PDK orders carry physical-properties weight in grams (see WeightServiceInterface::UNIT_GRAMS),
        // and the SDK's PhysicalPropertiesWeightV2 expects a {value, unit} object — not a primitive.
        ...(weight === undefined ? null : {physicalProperties: {weight: {value: weight, unit: 'g'}}}),
        carrier,
        packageType,
        deliveryType,
      };

      const response = await proxyCapabilities({body, parameters: {filterSupported: true}});

      return response.results ?? [];
    },
    {
      enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      onError: (error) => {
        globalLogger.error('shipment-capabilities-query', 'request failed', error);
      },
    },
  );
};
