import {isEnumValue, isOfType} from '@myparcel/ts-utils';
import {realUseUtil} from '../utils/realUseUtil';
import {triggerEvent} from '../utils/global/triggerEvent';
import {setFieldValue} from '../utils/global/setFieldValue';
import {getFieldValue} from '../utils/global/getFieldValue';
import {getElement} from '../utils/global/getElement';
import {getAddressFieldValue} from '../utils/global/getAddressFieldValue';
import {getAddressField} from '../utils/global/getAddressField';
import {fieldsEqual} from '../utils/global/fieldsEqual';
import {doRequest} from '../utils/global/doRequest';
import {type PdkCheckoutConfig} from '../types/checkout.types';
import {realCreateStore} from '../store/realCreateStore';
import {
  createEventName,
  EVENT_CHECKOUT,
  EVENT_STORE,
  EVENT_TYPE_INITIALIZE,
  EVENT_TYPE_INITIALIZED,
  EVENT_TYPE_UPDATE,
  EVENT_TYPE_UPDATED,
  PdkEvent,
} from '../data/events';
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
      isEnumValue,
      isOfType,
      setFieldValue,
      triggerEvent,
    },
  };
};
