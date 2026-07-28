import {PdkUtil, type StoreCallbackUpdate, useUtil} from '@myparcel-dev/pdk-checkout-common';
import {objectIsEqual} from '@myparcel-dev/ts-utils';
import {UPDATE_CONFIG_IN, UPDATE_DELIVERY_OPTIONS} from '@myparcel-dev/delivery-options';
import {debounce, deliveryOptionsIsRendered} from '../utils';
import {type DeliveryOptionsStoreState} from '../types';

/**
 * Send events to the delivery options when the configuration or address has changed.
 */
// eslint-disable-next-line complexity
export const updateConfigOrAddress: StoreCallbackUpdate<DeliveryOptionsStoreState> = debounce((newState, oldState) => {
  const triggerEvent = useUtil(PdkUtil.TriggerEvent);

  const {config: newConfig, address: newAddress, cartShipmentOptions: newCartOptions} = newState.configuration ?? {};
  const {config: oldConfig, address: oldAddress, cartShipmentOptions: oldCartOptions} = oldState?.configuration ?? {};

  const isRendered = deliveryOptionsIsRendered();

  // The cart's shipment options are part of the configuration the delivery options read, so a
  // change in them has to reach them the same way a config change does. Without this, options
  // the cart starts or stops forcing (like the ones age check requires) would only show up on
  // the next config or address change.
  const configChanged =
    !objectIsEqual(newConfig, oldConfig) || !objectIsEqual(newCartOptions ?? {}, oldCartOptions ?? {});

  if (isRendered && oldConfig && configChanged) {
    // If the delivery options are rendered and config has changed, send 'update_config' event
    triggerEvent(UPDATE_CONFIG_IN, newState.configuration);
  } else if (newState.enabled && (!isRendered || !oldConfig || !objectIsEqual(newAddress, oldAddress))) {
    // If the delivery options are enabled and either the address has changed or the delivery options are not rendered yet, send 'update_delivery_options' event
    triggerEvent(UPDATE_DELIVERY_OPTIONS, newState.configuration);
  }
});
