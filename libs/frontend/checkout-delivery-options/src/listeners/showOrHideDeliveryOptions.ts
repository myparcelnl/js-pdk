import {DeliveryOptionsStoreState} from '../store';
import {StoreCallbackUpdate} from '@myparcel-pdk/frontend-checkout-core/src';
import {toggleDeliveryOptions} from '../utils';

export const showOrHideDeliveryOptions: StoreCallbackUpdate<DeliveryOptionsStoreState> = (newState) => {
  toggleDeliveryOptions(newState.enabled);
};
