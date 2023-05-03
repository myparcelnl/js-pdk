/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {StoreListener, Util, useCheckoutStore, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {DeliveryOptionsConfiguration} from '../types';
import {getDeliveryOptionsAddress} from '../utils';
import {triggerDeliveryOptionsEvents} from '../listeners';

export type DeliveryOptionsStoreState = {
  configuration: DeliveryOptionsConfiguration;
  hiddenInput?: HTMLInputElement;
  output: Record<string, unknown>;
};

export const createDeliveryOptionsStore = () => {
  const createStore = useUtil(Util.CreateStore);

  const checkout = useCheckoutStore();

  const {config, strings} = checkout.state.context;

  return createStore<DeliveryOptionsStoreState>(Symbol('deliveryOptions'), () => {
    return {
      state: {
        /**
         * Configuration that is passed to the delivery options library.
         */
        configuration: {
          address: getDeliveryOptionsAddress(),
          config,
          strings,
        },

        /**
         * Output data
         */
        output: {},

        /**
         * Hidden input that is used to pass the output data to the backend.
         */
        hiddenInput: undefined,
      },

      listeners: {
        [StoreListener.Update]: [triggerDeliveryOptionsEvents],
      },
    };
  })();
};
