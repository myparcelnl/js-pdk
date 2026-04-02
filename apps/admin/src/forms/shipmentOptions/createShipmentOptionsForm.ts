/* eslint-disable @typescript-eslint/no-magic-numbers */
// noinspection JSUnusedGlobalSymbols

import {toRaw} from 'vue';
import {get} from 'lodash-unified';
import {defineForm, type FormInstance, type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type OneOrMore, toArray} from '@myparcel-dev/ts-utils';
import {type Plugin} from '@myparcel-dev/pdk-common';
import {addBulkEditNotification} from '../helpers';
import {createShipmentFormName} from '../../utils';
import {useModalStore} from '../../stores';
import {AdminModalKey} from '../../data';
import {useAdminConfig} from '../../composables';
import {type ShipmentOptionsRefs} from './types';
import {FIELD_CARRIER, FIELD_DELIVERY_TYPE, FIELD_LABEL_AMOUNT, FIELD_MANUAL_WEIGHT, FIELD_PACKAGE_TYPE} from './field';
import {createCarrierField} from './fields/createCarrierField';
import {createDeliveryTypeField} from './fields/createDeliveryTypeField';
import {createShipmentOptionField} from './fields/createShipmentOptionField';
import {createDigitalStampRangeField, createLabelAmountField, createPackageTypeField} from './fields';
import {type CarrierOptionData} from './carrierOptionData.types';
import {fieldFactoryRegistry} from './fieldFactoryRegistry';

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

  const carrierOptions = getCarrierOptions(order);
  const refs = buildDynamicRefs(order, carrierOptions);

  return defineForm(createShipmentFormName(order.externalIdentifier), {
    ...(isModal ? config.formConfigOverrides?.modal : null),
    ...config.formConfigOverrides?.shipmentOptions,
    fields: createShipmentOptionsFields(refs, order, carrierOptions),
  });
};

/**
 * Extract the options object from the carrier on the order's delivery options.
 * Returns an empty object if no carrier or options are found.
 */
const getCarrierOptions = (order: Plugin.ModelContextOrderDataContext): Record<string, CarrierOptionData> => {
  return (get(order, 'deliveryOptions.carrier.options') ?? {}) as Record<string, CarrierOptionData>;
};

/**
 * Build refs dynamically from carrier options and static fields.
 *
 * Instead of a hardcoded ALL_FIELDS list, refs are built from the actual
 * carrier options present in the context.
 */
const buildDynamicRefs = (
  order: Plugin.ModelContextOrderDataContext,
  carrierOptions: Record<string, CarrierOptionData>,
): ShipmentOptionsRefs => {
  const refs: ShipmentOptionsRefs = {};

  // Static field refs
  refs[FIELD_CARRIER] = get(order, `${FIELD_CARRIER}.externalIdentifier`);
  refs[FIELD_LABEL_AMOUNT] = get(order, FIELD_LABEL_AMOUNT);
  refs[FIELD_PACKAGE_TYPE] = get(order, FIELD_PACKAGE_TYPE);
  refs[FIELD_DELIVERY_TYPE] = get(order, FIELD_DELIVERY_TYPE);
  refs[FIELD_MANUAL_WEIGHT] = get(order, FIELD_MANUAL_WEIGHT);

  // Dynamic shipment option refs from carrier options
  for (const key of Object.keys(carrierOptions)) {
    const fieldName = `${SHIPMENT_OPTIONS_PREFIX}.${key}`;
    refs[fieldName] = get(order, fieldName);
  }

  return refs;
};

const createShipmentOptionsFields = (
  refs: ShipmentOptionsRefs,
  order: Plugin.ModelContextOrderDataContext,
  carrierOptions: Record<string, CarrierOptionData>,
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
  const dynamicFields = Object.entries(carrierOptions).map(([key, optionData]) => {
    const fieldName = `${SHIPMENT_OPTIONS_PREFIX}.${key}`;
    const factory = fieldFactoryRegistry[key];

    if (factory) {
      return factory(refs, fieldName, optionData);
    }

    return createShipmentOptionField(refs, fieldName, optionData);
  });

  return [...staticFields, ...dynamicFields];
};
