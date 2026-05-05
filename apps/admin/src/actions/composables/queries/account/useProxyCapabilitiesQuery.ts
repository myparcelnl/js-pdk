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

/**
 * The selection input for {@link useProxyCapabilitiesQuery}: the request body minus the
 * action-control `filterOptions` flag (which the composable always sets to `true`).
 */
export type CapabilitiesSelection = Omit<ProxyCapabilitiesBody, 'filterOptions'>;

/**
 * Typed view of `pdk.proxyCapabilities` — the shared `MyParcelSdk` helper widens every
 * `pdk.<endpoint>(...)` method's body to `undefined` and response to `never` because all
 * registered endpoints share a single `AbstractPdkEndpoint` base type. This signature tells
 * TypeScript what we actually know about this specific endpoint's contract from
 * `ProxyCapabilitiesDefinition`.
 */
type ProxyCapabilitiesCall = (options: {
  body: ProxyCapabilitiesBody;
}) => Promise<ProxyCapabilitiesDefinition['response']>;

/**
 * Query the shared CapabilitiesAction for the carrier capabilities that match the given selection.
 *
 * The selection ref is the only refetch trigger — no window-focus, mount, or reconnect refetches.
 * Server-side option filtering is opted in (`filterOptions: true`) so admin sees the same option
 * allowlist that `Carrier::attributesToArray` applies on the contract-definition path.
 */
export const useProxyCapabilitiesQuery = (
  selection: Ref<CapabilitiesSelection>,
): ResolvedQuery<BackendEndpoint.ProxyCapabilities> => {
  const enabled = computed(() => Boolean(selection.value.cc));
  const queryKey = computed(() => [BackendEndpoint.ProxyCapabilities, selection.value] as const);

  return useQuery(
    queryKey,
    async () => {
      const pdk = usePdkAdminApi();
      const proxyCapabilities = pdk.proxyCapabilities as unknown as ProxyCapabilitiesCall;

      const response = await proxyCapabilities({
        body: {...selection.value, filterOptions: true},
      });

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
