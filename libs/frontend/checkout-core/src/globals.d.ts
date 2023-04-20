import {PdkCheckout, PdkCheckoutConfig, PdkEvent} from './types';
import {PromiseOr, isOfType} from '@myparcel/ts-utils';
import {StoreData, createCheckoutStore, createSettingsStore, realCreateStore} from './store';
import {
  Util,
  fieldsEqual,
  getAddressField,
  getAddressFieldValue,
  getElement,
  getFieldValue,
  getFrontendContext,
  hasAddressType,
  setFieldValue,
  triggerEvent,
} from './utils';

declare global {
  interface MyParcelPdkUtils {
    [Util.CreateStore]: typeof realCreateStore;
    [Util.FieldsEqual]: typeof fieldsEqual;
    [Util.GetAddressFieldValue]: typeof getAddressFieldValue;
    [Util.GetAddressField]: typeof getAddressField;
    [Util.GetElement]: typeof getElement;
    [Util.GetFieldValue]: typeof getFieldValue;
    [Util.GetFrontendContext]: typeof getFrontendContext;
    [Util.HasAddressType]: typeof hasAddressType;
    [Util.IsOfType]: typeof isOfType;
    [Util.SetFieldValue]: typeof setFieldValue;
    [Util.TriggerEvent]: typeof triggerEvent;
  }

  interface MyParcelPdkStores {
    checkout: ReturnType<typeof createCheckoutStore>;
    settings: ReturnType<typeof createSettingsStore>;
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
  }

  interface Window {
    MyParcelPdk: MyParcelPdk;
  }
}
