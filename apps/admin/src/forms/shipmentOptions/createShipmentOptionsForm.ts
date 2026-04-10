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
import {type ShipmentOptionsRefs} from './types';
import {createShipmentOptionField} from './fields/createShipmentOptionField';
import {createDeliveryTypeField} from './fields/createDeliveryTypeField';
import {createCarrierField} from './fields/createCarrierField';
import {createDigitalStampRangeField, createLabelAmountField, createPackageTypeField} from './fields';
import {fieldFactoryRegistry} from './fieldFactoryRegistry';
import {FIELD_CARRIER, FIELD_DELIVERY_TYPE, FIELD_LABEL_AMOUNT, FIELD_MANUAL_WEIGHT, FIELD_PACKAGE_TYPE} from './field';

const SHIPMENT_OPTIONS_PREFIX = 'deliveryOptions.shipmentOptions';

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

  return defineForm(createShipmentFormName(order.externalIdentifier), {
    ...(isModal ? config.formConfigOverrides?.modal : null),
    ...config.formConfigOverrides?.shipmentOptions,
    fields: createShipmentOptionsFields(refs, order, allOptionKeys),
  });
};

/**
 * Collect the union of all option keys across all carriers from the dynamic context.
 *
 * Fields are created for every unique option key so they exist when the user
 * switches carriers. Visibility is controlled by `createHasShipmentOptionWatcher`
 * which checks whether the currently selected carrier supports each option.
 *
 * Runtime carrier-specific data (isRequired, insuredAmount, etc.) is read
 * from the currently selected carrier via `getCarrier(form)`, not from
 * creation-time option data.
 */
const collectAllOptionKeys = (
  carriers: {options: Record<string, unknown>}[],
): string[] => {
  const keys = new Set<string>();

  for (const carrier of carriers) {
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
const buildDynamicRefs = (
  order: Plugin.ModelContextOrderDataContext,
  optionKeys: string[],
): ShipmentOptionsRefs => {
  const refs: ShipmentOptionsRefs = {};

  // Static field refs
  refs[FIELD_CARRIER] = get(order, `${FIELD_CARRIER}.carrier`);
  refs[FIELD_LABEL_AMOUNT] = get(order, FIELD_LABEL_AMOUNT);
  refs[FIELD_PACKAGE_TYPE] = get(order, FIELD_PACKAGE_TYPE);
  refs[FIELD_DELIVERY_TYPE] = get(order, FIELD_DELIVERY_TYPE);
  refs[FIELD_MANUAL_WEIGHT] = get(order, FIELD_MANUAL_WEIGHT);

  // Dynamic shipment option refs from carrier options
  for (const key of optionKeys) {
    const fieldName = `${SHIPMENT_OPTIONS_PREFIX}.${key}`;
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
    const fieldName = `${SHIPMENT_OPTIONS_PREFIX}.${key}`;
    const factory = fieldFactoryRegistry[key];

    if (factory) {
      return factory(refs, fieldName);
    }

    return createShipmentOptionField(refs, fieldName);
  });

  return [...staticFields, ...dynamicFields];
};
