/* eslint-disable @typescript-eslint/no-magic-numbers */
// noinspection JSUnusedGlobalSymbols

import {toRaw} from 'vue';
import {get} from 'lodash-unified';
import {defineForm, type FormInstance, type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type OneOrMore, toArray} from '@myparcel-dev/ts-utils';
import {AdminContextKey, type Plugin} from '@myparcel-dev/pdk-common';
import {addBulkEditNotification} from '../helpers';
import {createShipmentFormName} from '../../utils';
import {useModalStore} from '../../stores';
import {AdminModalKey} from '../../data';
import {useAdminConfig, useContext} from '../../composables';
import {wireProxyCapabilities} from './wireProxyCapabilities';
import {useShipmentOptionsState} from './useShipmentOptionsState';
import {useCapabilitiesAutoClear} from './useCapabilitiesAutoClear';
import {type ShipmentOptionsRefs} from './types';
import {createShipmentOptionField} from './fields/createShipmentOptionField';
import {createDeliveryTypeField} from './fields/createDeliveryTypeField';
import {createCarrierField} from './fields/createCarrierField';
import {createDigitalStampRangeField, createLabelAmountField, createPackageTypeField} from './fields';
import {fieldFactoryRegistry} from './fieldFactoryRegistry';
import {
  FIELD_CARRIER,
  FIELD_DELIVERY_TYPE,
  FIELD_LABEL_AMOUNT,
  FIELD_MANUAL_WEIGHT,
  FIELD_PACKAGE_TYPE,
  optionFieldName,
} from './field';

export const createShipmentOptionsForm = (orders?: OneOrMore<Plugin.ModelPdkOrder>): FormInstance => {
  const ordersArray = toArray(orders ?? []).map(toRaw);

  const config = useAdminConfig();
  const modalStore = useModalStore();

  const isBulk = ordersArray.length > 1;
  const isModal = AdminModalKey.ShipmentOptions === modalStore.opened;

  if (isBulk) {
    addBulkEditNotification(isModal);
  }

  const order = ((isBulk ? undefined : ordersArray[0]) ?? {}) as Plugin.ModelContextOrderDataContext;

  const dynamicContext = useContext(AdminContextKey.Dynamic);
  const allOptionKeys = collectAllOptionKeys(dynamicContext.carriers);
  const refs = buildDynamicRefs(order, allOptionKeys);

  const form = defineForm(createShipmentFormName(order.externalIdentifier), {
    ...(isModal ? config.formConfigOverrides?.modal : null),
    ...config.formConfigOverrides?.shipmentOptions,
    fields: createShipmentOptionsFields(refs, order, allOptionKeys),
  });

  wireCapabilitiesBehavior(form, order, allOptionKeys, isBulk);

  return form;
};

/**
 * Connect the capability-driven behavior to the form. The option-state module is connected
 * for every form: without the per-order capability queries (bulk forms, orders without an
 * identifier) it still resolves which options are available per carrier, it just never locks
 * or forces anything.
 *
 * @param form - The freshly defined shipment-options form.
 * @param order - The order being edited; an empty object when editing multiple orders at once.
 * @param allOptionKeys - Every capability option key a field was created for (union across
 *   all carriers in the dynamic context).
 * @param isBulk - Whether the form edits multiple orders at once; bulk forms get no per-order
 *   capability queries.
 */
const wireCapabilitiesBehavior = (
  form: FormInstance,
  order: Plugin.ModelContextOrderDataContext,
  allOptionKeys: string[],
  isBulk: boolean,
): void => {
  const orderId = order.externalIdentifier;
  const proxyQueries = !isBulk && orderId ? wireProxyCapabilities(form, order) : undefined;
  const shipmentQuery = proxyQueries && orderId ? {orderId, selection: proxyQueries.selection} : undefined;

  useShipmentOptionsState(form, allOptionKeys, shipmentQuery);

  if (shipmentQuery) {
    useCapabilitiesAutoClear(
      form,
      allOptionKeys,
      shipmentQuery.orderId,
      order.inheritedDeliveryOptions,
      shipmentQuery.selection,
    );
  }
};

/**
 * Collect the union of all option keys across all carriers from the dynamic context.
 *
 * Fields are created for every unique option key so they exist when the user
 * switches carriers. Visibility, disabled state and locking are resolved per
 * option by the option-state module (`useShipmentOptionsState`) for whichever
 * carrier is currently selected — not from creation-time option data.
 */
const collectAllOptionKeys = (carriers: {options?: Record<string, unknown> | null}[]): string[] => {
  const keys = new Set<string>();

  for (const carrier of carriers) {
    if (!carrier.options) continue;

    for (const key of Object.keys(carrier.options)) {
      keys.add(key);
    }
  }

  return [...keys];
};

/**
 * Build refs dynamically from carrier options and static fields.
 *
 * Instead of a hardcoded ALL_FIELDS list, refs are built from the union of
 * all carrier options in the dynamic context.
 */
const buildDynamicRefs = (order: Plugin.ModelContextOrderDataContext, optionKeys: string[]): ShipmentOptionsRefs => {
  const refs: ShipmentOptionsRefs = {};

  // Static field refs
  refs[FIELD_CARRIER] = get(order, `${FIELD_CARRIER}.carrier`);
  refs[FIELD_LABEL_AMOUNT] = get(order, FIELD_LABEL_AMOUNT);
  refs[FIELD_PACKAGE_TYPE] = get(order, FIELD_PACKAGE_TYPE);
  refs[FIELD_DELIVERY_TYPE] = get(order, FIELD_DELIVERY_TYPE);
  refs[FIELD_MANUAL_WEIGHT] = get(order, FIELD_MANUAL_WEIGHT);

  // Dynamic shipment option refs from carrier options
  for (const key of optionKeys) {
    const fieldName = optionFieldName(key);
    refs[fieldName] = get(order, fieldName);
  }

  return refs;
};

const createShipmentOptionsFields = (
  refs: ShipmentOptionsRefs,
  order: Plugin.ModelContextOrderDataContext,
  optionKeys: string[],
): InteractiveElementConfiguration[] => {
  // Static fields — always present
  const staticFields = [
    createCarrierField(refs, order.inheritedDeliveryOptions),
    createPackageTypeField(refs),
    createDeliveryTypeField(refs),
    createLabelAmountField(refs),
    createDigitalStampRangeField(refs, order),
  ];

  // Dynamic shipment option fields — driven by carrier.options
  const dynamicFields = optionKeys.map((key) => {
    const fieldName = optionFieldName(key);
    const factory = fieldFactoryRegistry[key];

    if (factory) {
      return factory(refs, fieldName);
    }

    return createShipmentOptionField(refs, fieldName);
  });

  return [...staticFields, ...dynamicFields];
};
