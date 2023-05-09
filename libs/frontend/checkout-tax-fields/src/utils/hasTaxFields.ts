import {CarrierName} from '@myparcel/constants';
import {useDeliveryOptionsStore} from '@myparcel-pdk/frontend-checkout-delivery-options/src';
import {useSettings} from '@myparcel-pdk/frontend-checkout-core/src';

export const hasTaxFields = (): boolean => {
  const settings = useSettings();

  let hasTaxFields = true;

  if (settings.hasDeliveryOptions) {
    const deliveryOptions = useDeliveryOptionsStore();
    const carrier = deliveryOptions.state?.output?.carrier ?? null;

    hasTaxFields = Boolean(carrier && settings.carriersWithTaxFields.includes(carrier as CarrierName));
  }

  return hasTaxFields;
};
