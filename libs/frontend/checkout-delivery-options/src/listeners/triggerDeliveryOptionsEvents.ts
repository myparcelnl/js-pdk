import {EVENT_UPDATE_CONFIG, EVENT_UPDATE_DELIVERY_OPTIONS} from '@myparcel-pdk/frontend-delivery-options/src';
import {StoreCallbackUpdate, Util, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {DeliveryOptionsStoreState} from '../store';
import {objectIsEqual} from '@myparcel/ts-utils';

/**
 * Send events to the delivery options when the configuration or address has changed.
 */
export const triggerDeliveryOptionsEvents: StoreCallbackUpdate<DeliveryOptionsStoreState> = (
  {configuration: newConfiguration},
  {configuration: oldConfiguration},
) => {
  const triggerEvent = useUtil(Util.TriggerEvent);

  const {config: newConfig, address: newAddress} = newConfiguration ?? {};
  const {config: oldConfig, address: oldAddress} = oldConfiguration ?? {};

  // Update configuration if it has changed
  if (oldConfig && !objectIsEqual(newConfig, oldConfig)) {
    triggerEvent(EVENT_UPDATE_CONFIG, newConfiguration);

    // Otherwise, update delivery options if address has changed or this is the initial configuration
  } else if (!oldConfig || !objectIsEqual(newAddress, oldAddress)) {
    triggerEvent(EVENT_UPDATE_DELIVERY_OPTIONS, newConfiguration);
  }
};
