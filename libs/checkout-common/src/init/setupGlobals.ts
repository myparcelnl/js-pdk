// eslint-disable-next-line max-lines-per-function
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
import {type PdkCheckoutConfig} from '../types';
import {realCreateStore} from '../store';
import {
  createEventName,
  EVENT_CHECKOUT,
  EVENT_STORE,
  EVENT_TYPE_INITIALIZE,
  EVENT_TYPE_INITIALIZED,
  EVENT_TYPE_UPDATE,
  EVENT_TYPE_UPDATED,
  PdkEvent,
} from '../data';
import {initializeCheckoutStore} from './initializeCheckoutStore';
import {addFormListeners} from './addFormListeners';

export const setupGlobals = (config: PdkCheckoutConfig): void => {
  window.MyParcelPdk ??= {
    config,

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      checkout: null,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
