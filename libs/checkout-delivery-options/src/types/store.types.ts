import {type Store} from '@myparcel-pdk/checkout-common';
import {type CheckoutDeliveryOptionsSettings, type DeliveryOptionsConfiguration} from './generic.types';

export type DeliveryOptionsStoreState = {
  settings: CheckoutDeliveryOptionsSettings;
  configuration: DeliveryOptionsConfiguration;
  enabled: boolean;
  hiddenInput?: HTMLInputElement;
  output: Record<string, unknown>;
};

export type DeliveryOptionsStore = Store<DeliveryOptionsStoreState>;
