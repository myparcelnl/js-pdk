import {type Shipment} from '@myparcel-pdk/common';

export type FieldName = string;

const DELIVERY_OPTIONS_PREFIX = 'deliveryOptions';

const PHYSICAL_PROPERTIES_PREFIX = 'physicalProperties';

export const SHIPMENT_OPTIONS = `shipmentOptions`;

const SHIPMENT_OPTIONS_PREFIX = `${DELIVERY_OPTIONS_PREFIX}.${SHIPMENT_OPTIONS}`;

export const CARRIER = 'carrier' satisfies keyof Shipment.ModelDeliveryOptions;

export const LABEL_AMOUNT = 'labelAmount' satisfies keyof Shipment.ModelDeliveryOptions;

export const PACKAGE_TYPE = 'packageType' satisfies keyof Shipment.ModelDeliveryOptions;

export const AGE_CHECK = 'ageCheck' satisfies keyof Shipment.ModelShipmentOptions;

export const DIRECT_RETURN = 'return' satisfies keyof Shipment.ModelShipmentOptions;

export const HIDE_SENDER = 'hideSender' satisfies keyof Shipment.ModelShipmentOptions;

export const LARGE_FORMAT = 'largeFormat' satisfies keyof Shipment.ModelShipmentOptions;

export const ONLY_RECIPIENT = 'onlyRecipient' satisfies keyof Shipment.ModelShipmentOptions;

export const SAME_DAY_DELIVERY = 'sameDayDelivery' satisfies keyof Shipment.ModelShipmentOptions;

export const SIGNATURE = 'signature' satisfies keyof Shipment.ModelShipmentOptions;

export const INSURANCE = 'insurance' satisfies keyof Shipment.ModelShipmentOptions;

export const MANUAL_WEIGHT = 'manualWeight';

export const PROP_OPTIONS = 'options';

export const KEY_DESCRIPTION = 'description';

export const KEY_SUBTEXT = 'subtext';

export const FIELD_CARRIER: FieldName = `${DELIVERY_OPTIONS_PREFIX}.${CARRIER}`;

export const FIELD_LABEL_AMOUNT: FieldName = `${DELIVERY_OPTIONS_PREFIX}.${LABEL_AMOUNT}`;

export const FIELD_PACKAGE_TYPE: FieldName = `${DELIVERY_OPTIONS_PREFIX}.${PACKAGE_TYPE}`;

export const FIELD_AGE_CHECK: FieldName = `${SHIPMENT_OPTIONS_PREFIX}.${AGE_CHECK}`;

export const FIELD_DIRECT_RETURN: FieldName = `${SHIPMENT_OPTIONS_PREFIX}.${DIRECT_RETURN}`;

export const FIELD_HIDE_SENDER: FieldName = `${SHIPMENT_OPTIONS_PREFIX}.${HIDE_SENDER}`;

export const FIELD_LARGE_FORMAT: FieldName = `${SHIPMENT_OPTIONS_PREFIX}.${LARGE_FORMAT}`;

export const FIELD_ONLY_RECIPIENT: FieldName = `${SHIPMENT_OPTIONS_PREFIX}.${ONLY_RECIPIENT}`;

export const FIELD_SAME_DAY_DELIVERY: FieldName = `${SHIPMENT_OPTIONS_PREFIX}.${SAME_DAY_DELIVERY}`;

export const FIELD_SIGNATURE: FieldName = `${SHIPMENT_OPTIONS_PREFIX}.${SIGNATURE}`;

export const FIELD_INSURANCE: FieldName = `${SHIPMENT_OPTIONS_PREFIX}.${INSURANCE}`;

export const FIELD_MANUAL_WEIGHT: FieldName = `${PHYSICAL_PROPERTIES_PREFIX}.${MANUAL_WEIGHT}`;

export const ALL_FIELDS = [
  FIELD_AGE_CHECK,
  FIELD_CARRIER,
  FIELD_DIRECT_RETURN,
  FIELD_HIDE_SENDER,
  FIELD_INSURANCE,
  FIELD_LABEL_AMOUNT,
  FIELD_LARGE_FORMAT,
  FIELD_ONLY_RECIPIENT,
  FIELD_MANUAL_WEIGHT,
  FIELD_PACKAGE_TYPE,
  FIELD_SAME_DAY_DELIVERY,
  FIELD_SIGNATURE,
] as const;
