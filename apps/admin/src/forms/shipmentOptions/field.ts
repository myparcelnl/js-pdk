export type FieldName = string;

const DELIVERY_OPTIONS_PREFIX = 'deliveryOptions';

const PHYSICAL_PROPERTIES_PREFIX = 'physicalProperties';

export const SHIPMENT_OPTIONS = 'shipmentOptions';

export const CARRIER = 'carrier';

export const LABEL_AMOUNT = 'labelAmount';

export const PACKAGE_TYPE = 'packageType';

export const DELIVERY_TYPE = 'deliveryType';

export const MANUAL_WEIGHT = 'manualWeight';

export const PROP_OPTIONS = 'options';

export const KEY_DESCRIPTION = 'description';

export const KEY_SUBTEXT = 'subtext';

export const FIELD_CARRIER: FieldName = `${DELIVERY_OPTIONS_PREFIX}.${CARRIER}`;

export const FIELD_LABEL_AMOUNT: FieldName = `${DELIVERY_OPTIONS_PREFIX}.${LABEL_AMOUNT}`;

export const FIELD_PACKAGE_TYPE: FieldName = `${DELIVERY_OPTIONS_PREFIX}.${PACKAGE_TYPE}`;

export const FIELD_DELIVERY_TYPE: FieldName = `${DELIVERY_OPTIONS_PREFIX}.${DELIVERY_TYPE}`;

export const FIELD_MANUAL_WEIGHT: FieldName = `${PHYSICAL_PROPERTIES_PREFIX}.${MANUAL_WEIGHT}`;

export const FIELD_SHIPMENT_OPTIONS_PREFIX: FieldName = `${DELIVERY_OPTIONS_PREFIX}.${SHIPMENT_OPTIONS}`;
