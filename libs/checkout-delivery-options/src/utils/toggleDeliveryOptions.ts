import {EVENT_HIDE_DELIVERY_OPTIONS, EVENT_SHOW_DELIVERY_OPTIONS} from '@myparcel-pdk/delivery-options';
import {PdkUtil, useUtil} from '@myparcel-pdk/checkout-common';

export const toggleDeliveryOptions = (show: boolean): void => {
  const triggerEvent = useUtil(PdkUtil.TriggerEvent);

  triggerEvent(show ? EVENT_SHOW_DELIVERY_OPTIONS : EVENT_HIDE_DELIVERY_OPTIONS);
};
