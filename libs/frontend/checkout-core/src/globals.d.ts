import {PdkCheckout, PdkCheckoutConfig, PdkEvent} from './types';
import {PromiseOr, isOfType} from '@myparcel/ts-utils';
import {StoreData, createCheckoutStore, realCreateStore} from './store';
import {
  Util,
  doRequest,
  fieldsEqual,
  getAddressField,
  getAddressFieldValue,
  getElement,
  getFieldValue,
  setFieldValue,
  triggerEvent,
} from './utils';

declare global {
  interface MyParcelPdkUtils {
    [Util.CreateStore]: typeof realCreateStore;
    [Util.DoRequest]: typeof doRequest;
    [Util.FieldsEqual]: typeof fieldsEqual;
    [Util.GetAddressFieldValue]: typeof getAddressFieldValue;
    [Util.GetAddressField]: typeof getAddressField;
    [Util.GetElement]: typeof getElement;
    [Util.GetFieldValue]: typeof getFieldValue;
    [Util.IsOfType]: typeof isOfType;
    [Util.SetFieldValue]: typeof setFieldValue;
    [Util.TriggerEvent]: typeof triggerEvent;
  }

  interface MyParcelPdkStores {
    checkout: ReturnType<typeof createCheckoutStore>;
  }

  interface MyParcelPdkEvents {
    [PdkEvent.CheckoutUpdate]: string;
    [PdkEvent.CheckoutUpdated]: string;
    [PdkEvent.StoreInitialize]: string;
    [PdkEvent.StoreInitialized]: string;
  }

  interface MyParcelPdk {
    config: PdkCheckoutConfig;
    events: MyParcelPdkEvents;
    initializeCallbacks: (() => PromiseOr<void>)[];
    initialized: boolean;
    instance: PdkCheckout;
    storedState: StoreData;
    stores: MyParcelPdkStores;
    utils: MyParcelPdkUtils;

    /**
     * Pull in a util from the window object.
     */
    useUtil<N extends Util>(name: N): MyParcelPdkUtils[N];
  }

  interface Window {
    MyParcelPdk: MyParcelPdk;
  }
}
