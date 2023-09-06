import {useSettings} from '@myparcel-pdk/checkout-core';
import {type CarrierName} from '@myparcel/constants';

export const hasTaxFields = (): boolean => {
  const settings = useSettings();

  let hasTaxFields = true;

  if (settings.hasDeliveryOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {deliveryOptions} = window.MyParcelPdk.stores;
    const carrier = deliveryOptions.state?.output?.carrier ?? null;

    hasTaxFields = Boolean(carrier && settings.carriersWithTaxFields.includes(carrier as CarrierName));
  }

  return hasTaxFields;
};
