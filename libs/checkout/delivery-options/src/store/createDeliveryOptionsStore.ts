/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {StoreListener, useCheckoutStore, useUtil, Util} from '@myparcel-pdk/checkout-core';
import {getDeliveryOptionsAddress} from '../utils';
import {
  type CheckoutDeliveryOptionsSettings,
  type CheckoutDeliveryOptionsSettingsInput,
  type DeliveryOptionsConfiguration,
} from '../types';
import {showOrHideDeliveryOptions, updateConfigOrAddress} from '../listeners';
import {getResolvedSettings} from './getResolvedSettings';

export type DeliveryOptionsStoreState = {
  settings: CheckoutDeliveryOptionsSettings;
  configuration: DeliveryOptionsConfiguration;
  enabled: boolean;
  hiddenInput?: HTMLInputElement;
  output: Record<string, unknown>;
};

export const createDeliveryOptionsStore = (settings?: CheckoutDeliveryOptionsSettingsInput) => {
  const createStore = useUtil(Util.CreateStore);

  const checkout = useCheckoutStore();

  const {config, strings} = checkout.state.context;

  return createStore<DeliveryOptionsStoreState>(Symbol('deliveryOptions'), () => {
    return {
      state: {
        settings: getResolvedSettings(settings),

        /**
         * Configuration that is passed to the delivery options library.
         */
        configuration: {
          address: getDeliveryOptionsAddress(),
          config,
          strings,
        },

        /**
         * Whether the delivery options are enabled.
         */
        enabled: false,

        /**
         * Hidden input that is used to pass the output data to the backend.
         */
        hiddenInput: undefined,

        /**
         * Output data
         */
        output: {},
      },

      listeners: {
        [StoreListener.Update]: [updateConfigOrAddress, showOrHideDeliveryOptions],
      },
    };
  })();
};
