import {isOfType} from '@myparcel/ts-utils';
import {
  doRequest,
  fieldsEqual,
  getAddressField,
  getAddressFieldValue,
  getElement,
  getFieldValue,
  realUseUtil,
  setFieldValue,
  triggerEvent,
} from '../utils';
import {PdkCheckoutConfig, PdkEvent} from '../types';
import {realCreateStore} from '../store';
import {
  EVENT_CHECKOUT,
  EVENT_STORE,
  EVENT_TYPE_INITIALIZE,
  EVENT_TYPE_INITIALIZED,
  EVENT_TYPE_UPDATE,
  EVENT_TYPE_UPDATED,
  createEventName,
} from '../data';
import {initializeCheckoutStore} from './initializeCheckoutStore';
import {addFormListeners} from './addFormListeners';

// eslint-disable-next-line max-lines-per-function
export const setupGlobals = (config: PdkCheckoutConfig): void => {
  window.MyParcelPdk ??= {
    config,

    // @ts-expect-error todo
    events: {
      [PdkEvent.CheckoutUpdate]: createEventName(EVENT_CHECKOUT, EVENT_TYPE_UPDATE),
      [PdkEvent.CheckoutUpdated]: createEventName(EVENT_CHECKOUT, EVENT_TYPE_UPDATED),
      [PdkEvent.StoreInitialize]: createEventName(EVENT_STORE, EVENT_TYPE_INITIALIZE),
      [PdkEvent.StoreInitialized]: createEventName(EVENT_STORE, EVENT_TYPE_INITIALIZED),
    },

    initializeCallbacks: [initializeCheckoutStore, addFormListeners],
    initialized: false,

    // @ts-expect-error todo
    instance: null,

    storedState: {},

    stores: {
      // @ts-expect-error todo
      checkout: null,
      // @ts-expect-error todo
      deliveryOptions: null,
    },

    useUtil: realUseUtil,

    utils: {
      createStore: realCreateStore,
      doRequest,
      fieldsEqual,
      getAddressField,
      getAddressFieldValue,
      getElement,
      getFieldValue,
      isOfType,
      setFieldValue,
      triggerEvent,
    },
  };
};
