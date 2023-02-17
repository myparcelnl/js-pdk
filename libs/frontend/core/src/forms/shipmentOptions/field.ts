const DELIVERY_OPTIONS_PREFIX = 'deliveryOptions';

const SHIPMENT_OPTIONS_PREFIX = `${DELIVERY_OPTIONS_PREFIX}.shipmentOptions`;

export const CARRIER = `${DELIVERY_OPTIONS_PREFIX}.carrier`;

export const LABEL_AMOUNT = `${DELIVERY_OPTIONS_PREFIX}.labelAmount`;

export const PACKAGE_TYPE = `${DELIVERY_OPTIONS_PREFIX}.packageType`;

export const SIGNATURE = `${SHIPMENT_OPTIONS_PREFIX}.signature`;

export const ONLY_RECIPIENT = `${SHIPMENT_OPTIONS_PREFIX}.onlyRecipient`;

export const AGE_CHECK = `${SHIPMENT_OPTIONS_PREFIX}.ageCheck`;

export const DIRECT_RETURN = `${SHIPMENT_OPTIONS_PREFIX}.return`;

export const LARGE_FORMAT = `${SHIPMENT_OPTIONS_PREFIX}.largeFormat`;

export const SAME_DAY_DELIVERY = `${SHIPMENT_OPTIONS_PREFIX}.sameDayDelivery`;

export const INSURANCE = `${SHIPMENT_OPTIONS_PREFIX}.insurance`;
