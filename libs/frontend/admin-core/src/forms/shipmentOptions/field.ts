const DELIVERY_OPTIONS_PREFIX = 'deliveryOptions';

const SHIPMENT_OPTIONS_PREFIX = `${DELIVERY_OPTIONS_PREFIX}.shipmentOptions`;

export const CARRIER = 'carrier';

export const LABEL_AMOUNT = 'labelAmount';

export const PACKAGE_TYPE = 'packageType';

export const SIGNATURE = 'signature';

export const ONLY_RECIPIENT = 'onlyRecipient';

export const AGE_CHECK = 'ageCheck';

export const DIRECT_RETURN = 'return';

export const LARGE_FORMAT = 'largeFormat';

export const SAME_DAY_DELIVERY = 'sameDayDelivery';

export const INSURANCE = 'insurance';

export const PROP_OPTIONS = 'options';

export const FIELD_CARRIER = `${DELIVERY_OPTIONS_PREFIX}.${CARRIER}`;

export const FIELD_LABEL_AMOUNT = `${DELIVERY_OPTIONS_PREFIX}.${LABEL_AMOUNT}`;

export const FIELD_PACKAGE_TYPE = `${DELIVERY_OPTIONS_PREFIX}.${PACKAGE_TYPE}`;

export const FIELD_SIGNATURE = `${SHIPMENT_OPTIONS_PREFIX}.${SIGNATURE}`;

export const FIELD_ONLY_RECIPIENT = `${SHIPMENT_OPTIONS_PREFIX}.${ONLY_RECIPIENT}`;

export const FIELD_AGE_CHECK = `${SHIPMENT_OPTIONS_PREFIX}.${AGE_CHECK}`;

export const FIELD_DIRECT_RETURN = `${SHIPMENT_OPTIONS_PREFIX}.${DIRECT_RETURN}`;

export const FIELD_LARGE_FORMAT = `${SHIPMENT_OPTIONS_PREFIX}.${LARGE_FORMAT}`;

export const FIELD_SAME_DAY_DELIVERY = `${SHIPMENT_OPTIONS_PREFIX}.${SAME_DAY_DELIVERY}`;

export const FIELD_INSURANCE = `${SHIPMENT_OPTIONS_PREFIX}.${INSURANCE}`;
