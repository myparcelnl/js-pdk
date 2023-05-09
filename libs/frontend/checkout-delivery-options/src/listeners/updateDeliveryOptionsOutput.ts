import {Util, useEvent, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {PdkDeliveryOptionsEvent} from '../types';
import {useDeliveryOptionsStore} from '../store';

export const updateDeliveryOptionsOutput = (event: Event): void => {
  const isOfType = useUtil(Util.IsOfType);

  if (!isOfType<CustomEvent>(event, 'detail')) {
    return;
  }

  const deliveryOptions = useDeliveryOptionsStore();

  // Update the hidden input.
  if (deliveryOptions.state.hiddenInput) {
    deliveryOptions.state.hiddenInput.value = JSON.stringify(event.detail);
  }

  // Save the output data in the store.
  void deliveryOptions.set({output: event.detail});

  // Forward the event to the rest of the application.
  document.dispatchEvent(
    new CustomEvent(useEvent(PdkDeliveryOptionsEvent.DeliveryOptionsUpdated), {detail: event.detail}),
  );
};
