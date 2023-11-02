/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {PdkUtil, StoreListener, useCheckoutStore, useUtil} from '@myparcel-pdk/checkout-common';
import {getDeliveryOptionsAddress} from '../utils';
import {type DeliveryOptionsStoreState} from '../types/store.types';
import {type CheckoutDeliveryOptionsSettingsInput} from '../types';
import {showOrHideDeliveryOptions, updateConfigOrAddress} from '../listeners';
import {getResolvedSettings} from './getResolvedSettings';

export const createDeliveryOptionsStore = (settings?: CheckoutDeliveryOptionsSettingsInput) => {
  const createStore = useUtil(PdkUtil.CreateStore);

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
