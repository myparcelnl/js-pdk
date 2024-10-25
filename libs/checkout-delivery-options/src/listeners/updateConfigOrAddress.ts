import {PdkUtil, type StoreCallbackUpdate, useUtil} from '@myparcel-pdk/checkout-common';
import {objectIsEqual} from '@myparcel/ts-utils';
import {UPDATE_CONFIG_IN, UPDATE_DELIVERY_OPTIONS} from '@myparcel/delivery-options';
import {deliveryOptionsIsRendered} from '../utils/deliveryOptionsIsRendered';
import {debounce} from '../utils/debounce';
import {type DeliveryOptionsStoreState} from '../types/store.types';

/**
 * Send events to the delivery options when the configuration or address has changed.
 */
// eslint-disable-next-line complexity
export const updateConfigOrAddress: StoreCallbackUpdate<DeliveryOptionsStoreState> = debounce((newState, oldState) => {
  const triggerEvent = useUtil(PdkUtil.TriggerEvent);

  const {config: newConfig, address: newAddress} = newState.configuration ?? {};
  const {config: oldConfig, address: oldAddress} = oldState?.configuration ?? {};

  const isRendered = deliveryOptionsIsRendered();

  if (isRendered && oldConfig && !objectIsEqual(newConfig, oldConfig)) {
    // If the delivery options are rendered and config has changed, send 'update_config' event
    triggerEvent(UPDATE_CONFIG_IN, newState.configuration);
  } else if (newState.enabled && (!isRendered || !oldConfig || !objectIsEqual(newAddress, oldAddress))) {
    // If the delivery options are enabled and either the address has changed or the delivery options are not rendered yet, send 'update_delivery_options' event
    triggerEvent(UPDATE_DELIVERY_OPTIONS, newState.configuration);
  }
});
