import {EVENT_UPDATE_CONFIG, EVENT_UPDATE_DELIVERY_OPTIONS} from '@myparcel-pdk/frontend-delivery-options';
import {type StoreCallbackUpdate, Util, useUtil} from '@myparcel-pdk/frontend-checkout-core';
import {objectIsEqual} from '@myparcel/ts-utils';
import {deliveryOptionsIsRendered} from '../utils';
import {type DeliveryOptionsStoreState} from '../store';

/**
 * Send events to the delivery options when the configuration or address has changed.
 */
// eslint-disable-next-line complexity
export const updateConfigOrAddress: StoreCallbackUpdate<DeliveryOptionsStoreState> = (newState, oldState) => {
  const triggerEvent = useUtil(Util.TriggerEvent);

  const {config: newConfig, address: newAddress} = newState.configuration ?? {};
  const {config: oldConfig, address: oldAddress} = oldState?.configuration ?? {};

  const isRendered = deliveryOptionsIsRendered();

  if (isRendered && oldConfig && !objectIsEqual(newConfig, oldConfig)) {
    // If the delivery options are rendered and config has changed, send 'update_config' event
    triggerEvent(EVENT_UPDATE_CONFIG, newState.configuration);
  } else if (newState.enabled && (!isRendered || !oldConfig || !objectIsEqual(newAddress, oldAddress))) {
    // If the delivery options are enabled and either the address has changed or the delivery options are not rendered yet, send 'update_delivery_options' event
    triggerEvent(EVENT_UPDATE_DELIVERY_OPTIONS, newState.configuration);
  }
};
