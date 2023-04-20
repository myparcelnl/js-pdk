import {FrontendAppContext} from '@myparcel-pdk/frontend-checkout-core/src';
import {createDeliveryOptionsStore} from './createDeliveryOptionsStore';
import {getDeliveryOptionsAddress} from '../utils';

export const initializeDeliveryOptionsStore = (context: FrontendAppContext['checkout']): void => {
  const deliveryOptions = createDeliveryOptionsStore();

  window.MyParcelPdk.stores.deliveryOptions = deliveryOptions;

  deliveryOptions.set({
    config: context.config,
    strings: context.strings,
    address: getDeliveryOptionsAddress(),
  });
};
