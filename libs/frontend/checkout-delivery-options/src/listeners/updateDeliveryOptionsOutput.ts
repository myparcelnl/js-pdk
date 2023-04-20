import {Util, useEvent, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {PdkDeliveryOptionsEvent} from '../types';
import {useDeliveryOptionsStore} from '../utils';

export const updateDeliveryOptionsOutput = (event: Event): void => {
  const isOfType = useUtil(Util.IsOfType);

  if (!isOfType<CustomEvent>(event, 'detail')) {
    return;
  }

  const deliveryOptions = useDeliveryOptionsStore();

  deliveryOptions.set({output: event.detail});

  // Forward the event to the rest of the application.
  document.dispatchEvent(
    new CustomEvent(useEvent(PdkDeliveryOptionsEvent.DeliveryOptionsUpdated), {detail: event.detail}),
  );
};
