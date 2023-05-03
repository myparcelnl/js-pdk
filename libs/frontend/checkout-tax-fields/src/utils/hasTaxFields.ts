import {CarrierName} from '@myparcel/constants';
import {useSettings} from '@myparcel-pdk/frontend-checkout-core/src';

export const hasTaxFields = (): boolean => {
  const settings = useSettings();

  let hasTaxFields = true;

  if (settings.hasDeliveryOptions) {
    const {deliveryOptions} = window.MyParcelPdk.stores;

    const carrier = deliveryOptions.state.output.carrier ?? null;

    hasTaxFields = Boolean(carrier && settings.carriersWithTaxFields.includes(carrier as CarrierName));
  }

  return hasTaxFields;
};
