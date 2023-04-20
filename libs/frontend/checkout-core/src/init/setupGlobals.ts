import {
  EVENT_CHECKOUT,
  EVENT_STORE,
  EVENT_TYPE_INITIALIZE,
  EVENT_TYPE_INITIALIZED,
  EVENT_TYPE_UPDATE,
  EVENT_TYPE_UPDATED,
  createEventName,
} from '../data/eventNames';
import {PdkCheckoutConfig, PdkEvent} from '../types';
import {
  fieldsEqual,
  getAddressField,
  getAddressFieldValue,
  getElement,
  getFieldValue,
  getFrontendContext,
  hasAddressType,
  setFieldValue,
  triggerEvent,
} from '../utils';
import {addFormListeners} from './addFormListeners';
import {initializeStores} from '../store/initializeStores';
import {isOfType} from '@myparcel/ts-utils';
import {realCreateStore} from '../store';

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

    initializeCallbacks: [initializeStores, addFormListeners],
    initialized: false,

    // @ts-expect-error todo
    instance: null,

    storedState: {},

    stores: {
      // @ts-expect-error todo
      checkout: null,
      // @ts-expect-error todo
      deliveryOptions: null,
      // @ts-expect-error todo
      settings: null,
    },

    utils: {
      createStore: realCreateStore,
      fieldsEqual,
      getAddressField,
      getAddressFieldValue,
      getElement,
      getFieldValue,
      getFrontendContext,
      hasAddressType,
      isOfType,
      setFieldValue,
      triggerEvent,
    },
  };
};
