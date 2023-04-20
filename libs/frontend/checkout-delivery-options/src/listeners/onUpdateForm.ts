import {CheckoutStoreState, StoreCallbackUpdate} from '@myparcel-pdk/frontend-checkout-core/src';
import {getDeliveryOptionsAddress, useDeliveryOptionsStore} from '../utils';
import {objectIsEqual} from '@myparcel/ts-utils';
import {onShippingMethodChange} from './onShippingMethodChange';

export const onUpdateForm: StoreCallbackUpdate<CheckoutStoreState> = (newState, oldState) => {
  if (objectIsEqual(newState.form, oldState.form)) {
    return;
  }

  useDeliveryOptionsStore().set({address: getDeliveryOptionsAddress()});

  return onShippingMethodChange(newState, oldState);
};
