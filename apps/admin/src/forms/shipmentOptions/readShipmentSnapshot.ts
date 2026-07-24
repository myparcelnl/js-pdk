import {toValue, type Ref} from 'vue';
import {BackendEndpoint, type CarrierModel} from '@myparcel-dev/pdk-common';
import {type useQueryStore} from '../../stores';
import {type CapabilitiesSelection} from './wireProxyCapabilities';

export type ShipmentResponseSnapshot =
  | {state: 'pending'}
  | {state: 'invalid_combo'}
  | {state: 'matched'; carrier: CarrierModel};

/**
 * Read the shipment query's state directly so consumers can distinguish three cases the
 * helper-level `getCarrierCapabilitiesForShipment` collapses:
 *
 * - **`pending`**: query not registered, loading, errored, or has no data yet. A temporary
 *   state — consumers should wait and change nothing. Errored requests are logged via
 *   `globalLogger.error` inside the query composable; the form keeps its current selection
 *   rather than blocking the merchant on an intermittent failure.
 * - **`invalid_combo`**: query is `success` but `results` is empty or doesn't contain the
 *   chosen carrier. The server has confirmed this combination isn't valid.
 * - **`matched`**: query is `success` and the carrier was found. The response's narrow
 *   `options` carry the per-option metadata (`isRequired`, `requires`, `excludes`).
 *
 * @param selection - The debounced selection the shipment query was last fetched for, as
 *   returned by `wireProxyCapabilities`. Its carrier decides which response entry counts as
 *   a match.
 * @param queryStore - The query store instance, captured at setup time by the caller (calling
 *   `useQueryStore()` inside watcher callbacks is not allowed).
 * @param orderId - The order's external identifier; the shipment query is registered in the
 *   query store under `<orderId>.shipment`.
 */
export const readShipmentSnapshot = (
  selection: Readonly<Ref<CapabilitiesSelection>>,
  queryStore: ReturnType<typeof useQueryStore>,
  orderId: string,
): ShipmentResponseSnapshot => {
  const modifier = `${orderId}.shipment`;

  if (!queryStore.has(BackendEndpoint.ProxyCapabilities, modifier)) return {state: 'pending'};

  const query = queryStore.get(BackendEndpoint.ProxyCapabilities, modifier);

  if (toValue(query.status) !== 'success') return {state: 'pending'};

  const carriers = toValue(query.data) ?? [];
  // Compare against the carrier from the *debounced* selection — the same selection the
  // shipment query was last fetched for. Reading directly from `form.getValue(carrier)` here
  // would race: when the user just changed an axis, the form value updates immediately while
  // the debounced selection (and thus the query's data) lags by `DEBOUNCE_MS`. During that
  // window we'd compare the new form carrier against the previous-fetch's response, see no
  // match, and falsely declare invalid_combo.
  const queryCarrier = selection.value.carrier;
  const matched = carriers.find((carrier) => carrier.carrier === queryCarrier);

  return matched ? {state: 'matched', carrier: matched} : {state: 'invalid_combo'};
};
