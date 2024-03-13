import {PdkUtil, useUtil} from '@myparcel-pdk/checkout-common';
import {HIDE_DELIVERY_OPTIONS, SHOW_DELIVERY_OPTIONS} from '@myparcel/delivery-options';

export const toggleDeliveryOptions = (show: boolean): void => {
  const triggerEvent = useUtil(PdkUtil.TriggerEvent);

  triggerEvent(show ? SHOW_DELIVERY_OPTIONS : HIDE_DELIVERY_OPTIONS);
};
