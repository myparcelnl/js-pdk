/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EVENT_UPDATE_CONFIG, EVENT_UPDATE_DELIVERY_OPTIONS} from '@myparcel-pdk/frontend-delivery-options/src';
import {StoreListener, Util, useConfig, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {MyParcelDeliveryOptions} from '@myparcel/delivery-options';
import {objectIsEqual} from '@myparcel/ts-utils';

type ToRecord<T, k extends keyof T = keyof T> = Record<k, T[k]>;

export type DeliveryOptionsStoreState = ToRecord<MyParcelDeliveryOptions.Configuration> & {
  output: Record<string, unknown>;
};

export const createDeliveryOptionsStore = () => {
  const createStore = useUtil(Util.CreateStore);

  return createStore<DeliveryOptionsStoreState>(Symbol('deliveryOptions'), () => {
    return {
      state: {
        /**
         * Input config
         */
        config: {},

        /**
         * Input strings
         */
        strings: {},

        /**
         * Input address
         */
        address: {},

        /**
         * Output data
         */
        output: {},
      },

      listeners: {
        [StoreListener.Update]: [
          (newState, oldState) => {
            const getElement = useUtil(Util.GetElement);
            const config = useConfig();

            const triggerEvent = useUtil(Util.TriggerEvent);

            if (getElement(config.selectors.deliveryOptions, false)) {
              triggerEvent(EVENT_UPDATE_DELIVERY_OPTIONS, newState);
              return;
            }

            if (!objectIsEqual(newState.config, oldState.config)) {
              triggerEvent(EVENT_UPDATE_CONFIG, newState);
            } else if (!objectIsEqual(newState.address, oldState.address)) {
              triggerEvent(EVENT_UPDATE_DELIVERY_OPTIONS, newState);
            }
          },
        ],
      },
    };
  })();
};
