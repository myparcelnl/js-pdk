import {computed, onScopeDispose, type Ref} from 'vue';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {BackendEndpoint, type Plugin} from '@myparcel-dev/pdk-common';
import {globalLogger} from '../../services';
import {useQueryStore} from '../../stores';
import {
  useShipmentCapabilitiesQuery,
  type CapabilitiesSelection,
} from '../../actions/composables/queries/account/useShipmentCapabilitiesQuery';
import {
  useOrderCapabilitiesQuery,
  type OrderCapabilitiesInput,
} from '../../actions/composables/queries/account/useOrderCapabilitiesQuery';
import {useCapabilitiesWatcher, type FormInput, type OrderInput} from './useCapabilitiesWatcher';
import {FIELD_CARRIER, FIELD_DELIVERY_TYPE, FIELD_MANUAL_WEIGHT, FIELD_PACKAGE_TYPE} from './field';

/**
 * Wire BOTH capabilities queries — order-scoped (cc + weight) and shipment-scoped (full
 * selection) — into the shipment-options form for a single order, register them in the query
 * store under composite-string modifiers (`${orderId}.order` and `${orderId}.shipment`), and
 * tear them down when the form's scope disposes (modal close).
 *
 * The two queries serve different concerns:
 *
 * - **Order query** drives the carrier / packageType / deliveryType dropdowns from each
 *   carrier's flat union arrays. Refetches only when destination or weight change.
 * - **Shipment query** drives per-option metadata (`isRequired`, `requires`, `excludes`,
 *   `insuredAmount`) for the chosen combination. Refetches when any axis of the selection
 *   changes; the empty-result case is the invalid-combo signal consumed by
 *   `useCapabilitiesAutoClear`.
 *
 * Manual-weight reactivity: weight is sourced from `FIELD_MANUAL_WEIGHT` when the user has set
 * one, otherwise from `order.physicalProperties.initialWeight`. Both queries refetch when
 * weight changes through the slider.
 *
 * Skipped for bulk forms (no single orderId) and for orders without an externalIdentifier (no
 * key to register under).
 */
export const wireProxyCapabilities = (
  form: FormInstance,
  order: Plugin.ModelContextOrderDataContext,
): {selection: Readonly<Ref<CapabilitiesSelection>>} | undefined => {
  const orderId = order.externalIdentifier;

  if (!orderId) {
    globalLogger.debug('wireProxyCapabilities', 'skipped — order has no externalIdentifier', {order});

    return undefined;
  }

  const orderModifier = `${orderId}.order`;
  const shipmentModifier = `${orderId}.shipment`;

  // Use `form.getValue(name)` (which goes through `q(field.ref)` / `toValue` internally) rather
  // than `form.values[name]` so reactive deps are tracked correctly inside computed/watchers.
  const orderInput = computed<OrderInput>(() => {
    // FIELD_MANUAL_WEIGHT carries `TriState.Inherit` (-1) when the user hasn't entered a manual
    // override; only positive numbers represent an actual weight. Treat anything else as "unset"
    // and fall back to the order's initial weight.
    const manualWeightRaw = form.getValue(FIELD_MANUAL_WEIGHT);
    const manualWeight = typeof manualWeightRaw === 'number' && manualWeightRaw > 0 ? manualWeightRaw : undefined;

    return {
      cc: order.shippingAddress?.cc,
      weight: manualWeight ?? order.physicalProperties?.initialWeight,
    };
  });

  const formInput = computed<FormInput>(() => ({
    carrier: form.getValue<string | undefined>(FIELD_CARRIER),
    packageType: form.getValue<string | undefined>(FIELD_PACKAGE_TYPE),
    deliveryType: form.getValue<string | undefined>(FIELD_DELIVERY_TYPE),
  }));

  const selection = useCapabilitiesWatcher(orderInput, formInput);

  const orderInputForQuery = computed<OrderCapabilitiesInput>(() => ({
    cc: selection.value.cc,
    weight: selection.value.weight,
  }));

  const orderQuery = useOrderCapabilitiesQuery(orderInputForQuery);
  const shipmentQuery = useShipmentCapabilitiesQuery(selection);

  const queryStore = useQueryStore();

  queryStore.register(BackendEndpoint.ProxyCapabilities, orderModifier, orderQuery);
  queryStore.register(BackendEndpoint.ProxyCapabilities, shipmentModifier, shipmentQuery);

  // Drop both store entries when the form scope disposes (modal close). Without this, reopening
  // the modal for the same order would surface the prior session's stale data because
  // `register` returns the existing entry on second registration.
  onScopeDispose(() => {
    queryStore.unregister(BackendEndpoint.ProxyCapabilities, orderModifier);
    queryStore.unregister(BackendEndpoint.ProxyCapabilities, shipmentModifier);
  });

  return {selection};
};

// Re-exported for the auto-clear composable so it can refer to the same selection-shape type.
export type {CapabilitiesSelection};
