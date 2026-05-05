import {computed, type Ref} from 'vue';
import {useQuery} from '@tanstack/vue-query';
import {BackendEndpoint, type ExtractEndpointDefinition} from '@myparcel-dev/pdk-common';
import {type BackendEndpointDefinition} from '../../../../types';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';

/**
 * The full endpoint definition we declared in `sdk.types.ts`. Every other type in this file
 * derives from this single source so changes to the body or response shape there flow through
 * here automatically — no manual sync needed.
 */
type ProxyCapabilitiesDefinition = ExtractEndpointDefinition<
  BackendEndpoint.ProxyCapabilities,
  BackendEndpointDefinition
>;

type ProxyCapabilitiesBody = NonNullable<ProxyCapabilitiesDefinition['body']>;
type ProxyCapabilitiesParameters = NonNullable<ProxyCapabilitiesDefinition['parameters']>;

/**
 * The form-facing selection input — flat fields the form already has. The composable maps this
 * to the actual capabilities API request body shape (`recipient`, `physicalProperties`, …) at
 * the call site so consumers don't need to know the API's nesting conventions. Every field is
 * optional because the form may not have all values yet; the query gates on `cc` via `enabled`
 * and only fires once a destination is known. The shipment query also requires `carrier`,
 * `packageType` AND `deliveryType` to be set before firing — anything less wouldn't yield
 * shipment-specific metadata.
 *
 * `options` and `filterOptions` are intentionally not part of the selection: option toggles
 * don't drive refetches (option interactions resolve client-side), and the composable always
 * opts in to server-side allowlist filtering via the `filterOptions` query parameter.
 */
export type CapabilitiesSelection = {
  cc?: string;
  weight?: number;
  carrier?: string;
  packageType?: string;
  deliveryType?: string;
};

/**
 * Typed view of `pdk.proxyCapabilities` — the shared `MyParcelSdk` helper widens every
 * `pdk.<endpoint>(...)` method's body to `undefined` and response to `never` because all
 * registered endpoints share a single `AbstractPdkEndpoint` base type. This signature tells
 * TypeScript what we actually know about this specific endpoint's contract from
 * `ProxyCapabilitiesDefinition`.
 */
type ProxyCapabilitiesCall = (options: {
  body: ProxyCapabilitiesBody;
  parameters?: ProxyCapabilitiesParameters;
}) => Promise<ProxyCapabilitiesDefinition['response']>;

/**
 * Shipment-scoped capabilities query — fires the shared CapabilitiesAction with the FULL
 * selection (carrier + packageType + deliveryType + cc + weight) and returns the matching
 * carrier entry (the one shipment configuration the user has chosen). Drives the option panel
 * and acts as the invalid-combo signal: when `results` is empty, the chosen combination isn't
 * valid for the order context.
 *
 * The selection ref is the only refetch trigger — no window-focus, mount, or reconnect refetches.
 * Server-side option filtering is opted in via the `filterOptions` query parameter so admin sees
 * the same option allowlist that `Carrier::attributesToArray` applies on the contract-definition
 * path.
 */
export const useShipmentCapabilitiesQuery = (
  selection: Ref<CapabilitiesSelection>,
): ResolvedQuery<BackendEndpoint.ProxyCapabilities> => {
  const enabled = computed(() =>
    Boolean(selection.value.cc && selection.value.carrier && selection.value.packageType && selection.value.deliveryType),
  );
  const queryKey = computed(() => [BackendEndpoint.ProxyCapabilities, 'shipment', selection.value] as const);

  return useQuery(
    queryKey,
    async () => {
      const {cc, weight, carrier, packageType, deliveryType} = selection.value;

      // The `enabled` gate guarantees these are all present when this runs; TypeScript can't
      // see through the runtime check, so we narrow explicitly here.
      if (!cc || !carrier || !packageType || !deliveryType) return [];

      const pdk = usePdkAdminApi();
      const proxyCapabilities = pdk.proxyCapabilities as unknown as ProxyCapabilitiesCall;

      const body: ProxyCapabilitiesBody = {
        recipient: {countryCode: cc},
        // PDK orders carry physical-properties weight in grams (see WeightServiceInterface::UNIT_GRAMS),
        // and the SDK's PhysicalPropertiesWeightV2 expects a {value, unit} object — not a primitive.
        ...(weight !== undefined ? {physicalProperties: {weight: {value: weight, unit: 'g'}}} : null),
        carrier,
        packageType,
        deliveryType,
      };

      const response = await proxyCapabilities({body, parameters: {filterOptions: 'true'}});

      return response.results ?? [];
    },
    {
      enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );
};
