import {Util, useConfig, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {EVENT_UPDATE_DELIVERY_OPTIONS} from '@myparcel-pdk/frontend-delivery-options/src';
import {useDeliveryOptionsStore} from '../store';

export const bootDeliveryOptions = (): void => {
  const deliveryOptions = useDeliveryOptionsStore();

  const config = useConfig();
  const getElement = useUtil(Util.GetElement);
  const triggerEvent = useUtil(Util.TriggerEvent);

  // Render delivery options if it's not rendered yet
  if (getElement(config.selectors.deliveryOptions, false)) {
    triggerEvent(EVENT_UPDATE_DELIVERY_OPTIONS, deliveryOptions.state);
  }
};
