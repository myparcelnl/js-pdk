import {type Keyable} from '@myparcel-pdk/common';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type AddressType, type StoreListener} from '../data';
import {type CheckoutAppCheckoutContext, type PdkCheckoutForm} from './checkout.types';

type StoreListeners<T extends StoreState> = {
  [StoreListener.Update]: StoreCallbackUpdate<T>;
};

export type StoreState = Record<string, unknown>;

export type StoreListenerObject<S extends StoreState> = {
  [L in StoreListener]?: StoreListeners<S>[L][];
};

export type StoreCallbackUpdate<T extends StoreState = StoreState> = (newState: T, oldState?: T) => PromiseOr<void | T>;

export type StoreData<S extends StoreState = StoreState, N extends Keyable = Keyable> = Record<N, Store<S>>;

export type InitialStoreData<S extends StoreState = StoreState> = {
  state: S;
  listeners?: StoreListenerObject<S>;
};

export type Store<S extends StoreState = StoreState> = {
  readonly set: (newState: Partial<S>) => PromiseOr<void>;
  readonly state: S;
  readonly listeners: StoreListenerObject<S>;
  readonly on: <L extends StoreListener>(listener: L, callback: StoreListeners<S>[L]) => void;
};

export type CheckoutStoreState = {
  addressType: AddressType;
  addressTypes: AddressType[];
  context: CheckoutAppCheckoutContext;
  form: PdkCheckoutForm;
};

export type CheckoutStore = Store<CheckoutStoreState>;

export interface Stores {
  checkout: CheckoutStore;
}
