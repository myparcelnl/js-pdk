import {toValue, watch} from 'vue';
import {snakeCase} from 'lodash-unified';
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {AdminContextKey, BackendEndpoint, type CarrierModel, type Plugin} from '@myparcel-dev/pdk-common';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_CARRIER, FIELD_DELIVERY_TYPE, FIELD_PACKAGE_TYPE, PROP_OPTIONS} from '../field';
import {
  defineFormField,
  getDeliveryTypes,
  getPackageTypes,
  resolveFormComponent,
  setFieldProp,
  updateFieldsDefaults,
  useFormCapabilities,
} from '../../helpers';
import {createAssetUrl, getOrderId} from '../../../utils';
import {type RadioGroupOption} from '../../../types';
import {useQueryStore} from '../../../stores';
import {useFetchCarrier} from '../../../sdk';
import {AdminComponent} from '../../../data';
import {useContext, useLanguage} from '../../../composables';
import {createRef} from './createRef';

type CarrierMeta = {label: string; image?: string};

type OrderCarriersState =
  | undefined // No query registered (bulk or before wireProxyCapabilities runs) — show all.
  | 'loading' // Order query is loading — show no options yet.
  | CarrierModel[]; // Success — only carriers in this list are available.

// eslint-disable-next-line max-lines-per-function
export const createCarrierField = (
  refs: ShipmentOptionsRefs,
  inheritedDeliveryOptions: Plugin.ModelContextOrderDataContext['inheritedDeliveryOptions'],
): InteractiveElementConfiguration => {
  const dynamicContext = useContext(AdminContextKey.Dynamic);
  const capabilities = useFormCapabilities();
  const queryStore = useQueryStore();
  const orderId = getOrderId();
  const orderModifier = typeof orderId === 'string' ? `${orderId}.order` : undefined;

  const {translate} = useLanguage();

  const staticMeta = new Map<string, CarrierMeta>();

  /**
   * Read the order-capabilities query state. Returns:
   * - `undefined` when there's no query (bulk path, or pre-wire) → fallback: render all carriers.
   * - `undefined` when the query is registered but disabled (e.g. order has no country code, so
   *   `useOrderCapabilitiesQuery`'s `enabled` gate is false). TanStack reports `status: 'pending'`
   *   indefinitely in that state, so we detect it via `fetchStatus === 'idle'` and fall back to
   *   the unfiltered carrier list instead of trapping the user in a permanent loading state.
   * - `'loading'` while the query hasn't resolved → render no options to avoid a flash where
   *   carriers appear and then a subset disappears once the response lands.
   * - `CarrierModel[]` on success → render only the carriers in this list (others are hidden).
   * - On error: treated as `undefined` so the merchant can still operate the form, accepting
   *   that a stale or empty filter is better than an empty radio.
   */
  const readOrderCarriers = (): OrderCarriersState => {
    if (!orderModifier || !queryStore.has(BackendEndpoint.ProxyCapabilities, orderModifier)) {
      return undefined;
    }

    const query = queryStore.get(BackendEndpoint.ProxyCapabilities, orderModifier);
    const status = toValue(query.status);
    const fetchStatus = toValue(query.fetchStatus);

    if (status === 'success') {
      return (toValue(query.data) ?? []) as CarrierModel[];
    }

    if (status === 'error') {
      return undefined;
    }

    if (fetchStatus === 'idle') {
      return undefined;
    }

    return 'loading';
  };

  const computeOptions = (state: OrderCarriersState): RadioGroupOption[] => {
    if (state === 'loading') return [];

    const validCarrierNames = Array.isArray(state) ? new Set(state.map((c) => c.carrier)) : null;
    const carriersToRender = validCarrierNames
      ? dynamicContext.carriers.filter((carrier) => validCarrierNames.has(carrier.carrier ?? ''))
      : dynamicContext.carriers;

    return carriersToRender.map((carrier): RadioGroupOption => {
      const name = carrier.carrier ?? '';
      const meta = staticMeta.get(name);

      return {
        plainLabel: meta?.label ?? name,
        value: name,
        image: meta?.image,
      };
    });
  };

  return defineFormField({
    name: FIELD_CARRIER,
    label: 'carrier',
    ref: createRef<string>(refs, FIELD_CARRIER, dynamicContext.shop.defaultCarrier ?? undefined),
    component: resolveFormComponent(AdminComponent.RadioGroup),
    props: {
      options: [],
    },

    onBeforeMount: async (field) => {
      // Fetch per-carrier metadata (logo + localized human name) once. Stored in `staticMeta`
      // so the reactive options watcher below can stitch label/image together with the
      // current order-capabilities filter without re-fetching.
      await Promise.all(
        dynamicContext.carriers.map(async (carrier) => {
          const query = useFetchCarrier(carrier.carrier);

          await query.suspense();

          const apiCarrier = toValue(query.data);

          staticMeta.set(carrier.carrier ?? '', {
            label: apiCarrier?.human ?? translate(`carrier_${snakeCase(carrier.carrier)}`) ?? '',
            image: apiCarrier?.meta.logo_svg ? createAssetUrl(apiCarrier.meta.logo_svg) : undefined,
          });
        }),
      );

      // Reactively rebuild the carrier radio options whenever the order-capabilities query
      // changes state (loading → success, or weight/cc edits triggering a refetch). Carriers
      // that aren't valid for the current order context (e.g. weight below the minimum) are
      // hidden from the radio entirely — preventing the dead-end scenario where the form
      // populates with packageType / deliveryType radios that have no valid combo. The
      // RadioGroup component doesn't honor per-option `disabled` flags, so filter is the
      // only way to express "not available" today.
      //
      // Also refresh package/delivery type dropdowns from the same response: weight/cc edits
      // can shrink the available types for a carrier without changing the chosen carrier, and
      // `afterUpdate` only runs on carrier change. Without this refresh those dropdowns would
      // keep stale options after the order-capabilities response narrows.
      watch(
        () => readOrderCarriers(),
        (state) => {
          setFieldProp(field, PROP_OPTIONS, computeOptions(state));

          const carrier = capabilities.getCarrierCapabilitiesForOrder(field.form);

          if (carrier) {
            setFieldProp(field.form, FIELD_PACKAGE_TYPE, PROP_OPTIONS, getPackageTypes(carrier));
            setFieldProp(field.form, FIELD_DELIVERY_TYPE, PROP_OPTIONS, getDeliveryTypes(carrier));
          }
        },
        {immediate: true},
      );

      await field?.afterUpdate?.(field, toValue(field.ref), undefined);

      updateFieldsDefaults(toValue(field.ref) as string, field, inheritedDeliveryOptions);
    },

    afterUpdate: (field, newCarrier: string) => {
      updateFieldsDefaults(newCarrier, field, inheritedDeliveryOptions);

      const carrier = capabilities.getCarrierCapabilitiesForOrder(field.form);

      setFieldProp(field.form, FIELD_PACKAGE_TYPE, PROP_OPTIONS, getPackageTypes(carrier));
      setFieldProp(field.form, FIELD_DELIVERY_TYPE, PROP_OPTIONS, getDeliveryTypes(carrier));
    },
  });
};
