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
import {useContext, useGlobalContext, useLanguage} from '../../../composables';
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
  const caps = useFormCapabilities();
  const queryStore = useQueryStore();
  const orderId = getOrderId();
  const orderModifier = typeof orderId === 'string' ? `${orderId}.order` : undefined;

  const {translate} = useLanguage();

  const staticMeta = new Map<string, CarrierMeta>();

  /**
   * Read the order-capabilities query state. Returns:
   * - `undefined` when there's no query (bulk path, or pre-wire) → fallback: enable all carriers.
   * - `'loading'` while the query hasn't resolved → render no options to avoid a misleading
   *   enabled-then-disabled flash.
   * - `CarrierModel[]` on success → enable only carriers in this list, disable the rest.
   * - On error: treated as `undefined` so the merchant can still operate the form, accepting
   *   that a stale or empty filter is better than an empty radio.
   */
  const readOrderCarriers = (): OrderCarriersState => {
    if (!orderModifier || !queryStore.has(BackendEndpoint.ProxyCapabilities, orderModifier)) {
      return undefined;
    }

    const query = queryStore.get(BackendEndpoint.ProxyCapabilities, orderModifier);
    const status = toValue(query.status);

    if (status === 'success') {
      return (toValue(query.data) ?? []) as CarrierModel[];
    }

    if (status === 'error') {
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
    ref: createRef<string>(refs, FIELD_CARRIER, useGlobalContext().proposition.defaultCarrier),
    component: resolveFormComponent(AdminComponent.RadioGroup),
    props: {
      options: [],
    },

    onBeforeMount: async (field) => {
      // Fetch per-carrier metadata (logo + localized human name) once. Stored in `staticMeta`
      // so the reactive options watcher below can stitch label/image together with the
      // disabled flag derived from the order-capabilities query.
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
      // that aren't valid for the current order context are rendered with `disabled: true`
      // so the merchant can see they exist but can't pick them — preventing the dead-end
      // scenario where the form populates with packageType / deliveryType radios that have
      // no valid combo.
      watch(
        () => readOrderCarriers(),
        (state) => setFieldProp(field, PROP_OPTIONS, computeOptions(state)),
        {immediate: true},
      );

      await field?.afterUpdate?.(field, toValue(field.ref), undefined);

      updateFieldsDefaults(toValue(field.ref) as string, field, inheritedDeliveryOptions);
    },

    afterUpdate: (field, newCarrier: string) => {
      updateFieldsDefaults(newCarrier, field, inheritedDeliveryOptions);

      const carrier = caps.getCarrierForOrder(field.form);

      setFieldProp(field.form, FIELD_PACKAGE_TYPE, PROP_OPTIONS, getPackageTypes(carrier));
      setFieldProp(field.form, FIELD_DELIVERY_TYPE, PROP_OPTIONS, getDeliveryTypes(carrier));
    },
  });
};
