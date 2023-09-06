import {useEvent, useUtil, Util} from '@myparcel-pdk/checkout-core';
import {PdkDeliveryOptionsEvent} from '../types';
import {useDeliveryOptionsStore} from '../store';

export const updateDeliveryOptionsOutput = (event: Event): void => {
  const isOfType = useUtil(Util.IsOfType);

  if (!isOfType<CustomEvent>(event, 'detail')) {
    return;
  }

  // TODO: figure out why the build reports a ts error when using event.detail.
  const customEvent = event as unknown as CustomEvent;

  const deliveryOptions = useDeliveryOptionsStore();

  // Update the hidden input.
  if (deliveryOptions.state.hiddenInput) {
    deliveryOptions.state.hiddenInput.value = JSON.stringify(customEvent.detail);
  }

  // Save the output data in the store.
  void deliveryOptions.set({output: customEvent.detail});

  // Forward the event to the rest of the application.
  document.dispatchEvent(
    new CustomEvent(useEvent(PdkDeliveryOptionsEvent.DeliveryOptionsUpdated), {detail: customEvent.detail}),
  );
};
