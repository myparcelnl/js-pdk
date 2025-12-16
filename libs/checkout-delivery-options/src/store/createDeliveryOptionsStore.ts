import {PdkUtil, StoreListener, useCheckoutStore, useUtil} from '@myparcel-dev/pdk-checkout-common';
import {CarrierSetting} from '@myparcel-dev/delivery-options';
import {getDeliveryOptionsAddress, getResolvedSettings} from '../utils';
import {type CheckoutDeliveryOptionsSettingsInput, type DeliveryOptionsStoreState} from '../types';
import {showOrHideDeliveryOptions, updateConfigOrAddress} from '../listeners';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createDeliveryOptionsStore = (settings?: CheckoutDeliveryOptionsSettingsInput) => {
  const createStore = useUtil(PdkUtil.CreateStore);

  const checkout = useCheckoutStore();

  const {config, strings, platformConfig} = checkout.state.context;

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
          platformConfig,
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
         * The original package type that was passed initially. Used to reset the package type when the shipping method changes.
         */
        originalPackageType: config?.[CarrierSetting.PackageType],

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
