import {type isEnumValue, type isOfType, type PromiseOr} from '@myparcel/ts-utils';
import {type triggerEvent} from '../utils/global/triggerEvent';
import {type setFieldValue} from '../utils/global/setFieldValue';
import {type getFieldValue} from '../utils/global/getFieldValue';
import {type getElement} from '../utils/global/getElement';
import {type getAddressFieldValue} from '../utils/global/getAddressFieldValue';
import {type getAddressField} from '../utils/global/getAddressField';
import {type fieldsEqual} from '../utils/global/fieldsEqual';
import {type doRequest} from '../utils/global/doRequest';
import {type realCreateStore} from '../store/realCreateStore';
import {type PdkUtil} from '../data/utils';
import {type PdkEvent} from '../data/events';
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
