import {
  type createCheckoutStore,
  type doRequest,
  type fieldsEqual,
  type getAddressField,
  type getAddressFieldValue,
  type getElement,
  type getFieldValue,
  type PdkCheckout,
  type PdkCheckoutConfig,
  type realCreateStore,
  type setFieldValue,
  type StoreData,
  type triggerEvent,
  type Util,
} from '@myparcel-pdk/checkout-core';
import {type PdkEvent} from '@myparcel-pdk/checkout-common';
import {type isOfType, type PromiseOr} from '@myparcel/ts-utils';

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
