import {type isEnumValue, type isOfType, type PromiseOr} from '@myparcel-dev/ts-utils';
import {
  type doRequest,
  type fieldsEqual,
  type getAddressField,
  type getAddressFieldValue,
  type getElement,
  type getFieldValue,
  type setFieldValue,
  type triggerEvent,
} from '../utils';
import {type realCreateStore} from '../store';
import {type PdkEvent, type PdkUtil} from '../data';
import {type CheckoutStore, type StoreData} from './store.types';
import {type PdkCheckout, type PdkCheckoutConfig} from './checkout.types';

export interface PdkEvents extends AdditionalEvents {
  [PdkEvent.CheckoutUpdate]: string;
  [PdkEvent.CheckoutUpdated]: string;
  [PdkEvent.StoreInitialize]: string;
  [PdkEvent.StoreInitialized]: string;
}

export interface PdkStores extends AdditionalStores {
  checkout: CheckoutStore;
}

export interface PdkUtils extends AdditionalUtils {
  [PdkUtil.CreateStore]: typeof realCreateStore;
  [PdkUtil.DoRequest]: typeof doRequest;
  [PdkUtil.FieldsEqual]: typeof fieldsEqual;
  [PdkUtil.GetAddressFieldValue]: typeof getAddressFieldValue;
  [PdkUtil.GetAddressField]: typeof getAddressField;
  [PdkUtil.GetElement]: typeof getElement;
  [PdkUtil.GetFieldValue]: typeof getFieldValue;
  [PdkUtil.IsEnumValue]: typeof isEnumValue;
  [PdkUtil.IsOfType]: typeof isOfType;
  [PdkUtil.SetFieldValue]: typeof setFieldValue;
  [PdkUtil.TriggerEvent]: typeof triggerEvent;
}

export interface MyParcelPdk {
  config: PdkCheckoutConfig;
  events: PdkEvents;
  initializeCallbacks: (() => PromiseOr<void>)[];
  initialized: boolean;
  instance: PdkCheckout;
  storedState: StoreData;
  stores: PdkStores;
  utils: PdkUtils;

  /**
   * Pull in a util from the window object.
   */
  useUtil<N extends PdkUtil>(name: N): PdkUtils[N];
}
