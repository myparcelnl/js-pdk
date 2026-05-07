import {computed, type Ref} from 'vue';
import {useQuery} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-dev/pdk-common';
import {type ProxyCapabilitiesBody, type ProxyCapabilitiesCall} from '../../../../types';
import {globalLogger} from '../../../../services';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';

/**
 * The form-facing input for {@link useOrderCapabilitiesQuery} — flat fields from the order
 * context. Carrier / packageType / deliveryType are intentionally omitted: this query asks
 * "what's possible for this order" across all carriers, regardless of what the user has
 * currently selected on the form. The shipment-scoped query handles the chosen-combo case.
 */
export type OrderCapabilitiesInput = {
  cc?: string;
  weight?: number;
};

/**
 * Order-scoped capabilities query — fires the shared CapabilitiesAction with ONLY destination
 * and weight, no carrier/packageType/deliveryType filters. Returns one entry per carrier with
 * the union of `packageTypes`, `deliveryTypes`, and `options` valid for the order context.
 *
 * Drives the carrier / packageType / deliveryType dropdowns. Refetches only on cc / weight
 * changes so option toggles and dropdown picks don't trigger needless network round-trips.
 *
 * Server-side option allowlist filtering is NOT applied here (no `filterOptions` parameter).
 * The shipment-scoped query is the source for option metadata (`requires` / `excludes`); the
 * order query response is consumed for type lists only.
 *
 * Errors are logged via `globalLogger.error` so we have a breadcrumb for support, but we
 * deliberately don't surface a user-facing toast — an intermittent capabilities failure
 * shouldn't block the form, and the auto-clear treats the errored state as still-loading.
 */
export const useOrderCapabilitiesQuery = (
  input: Ref<OrderCapabilitiesInput>,
): ResolvedQuery<BackendEndpoint.ProxyCapabilities> => {
  const enabled = computed(() => Boolean(input.value.cc));
  const queryKey = computed(() => [BackendEndpoint.ProxyCapabilities, 'order', input.value] as const);

  return useQuery(
    queryKey,
    async () => {
      const {cc, weight} = input.value;

      if (!cc) return [];

      const pdk = usePdkAdminApi();
      const proxyCapabilities = pdk.proxyCapabilities as unknown as ProxyCapabilitiesCall;

      const body: ProxyCapabilitiesBody = {
        recipient: {countryCode: cc},
        ...(weight !== undefined ? {physicalProperties: {weight: {value: weight, unit: 'g'}}} : null),
      };

      const response = await proxyCapabilities({body});

      return response.results ?? [];
    },
    {
      enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      onError: (error) => {
        globalLogger.error('order-capabilities-query', 'request failed', error);
      },
    },
  );
};
