import {EVENT_HIDE_DELIVERY_OPTIONS, EVENT_SHOW_DELIVERY_OPTIONS} from '@myparcel-pdk/frontend-delivery-options';
import {Util, useUtil} from '@myparcel-pdk/frontend-checkout-core';

export const toggleDeliveryOptions = (show: boolean): void => {
  const triggerEvent = useUtil(Util.TriggerEvent);

  triggerEvent(show ? EVENT_SHOW_DELIVERY_OPTIONS : EVENT_HIDE_DELIVERY_OPTIONS);
};
