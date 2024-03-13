import {type Store} from '@myparcel-pdk/checkout-common';
import {type InputDeliveryOptionsConfiguration} from '@myparcel/delivery-options';
import {type CheckoutDeliveryOptionsSettings} from './generic.types';

export type DeliveryOptionsStoreState = {
  settings: CheckoutDeliveryOptionsSettings;
  configuration: InputDeliveryOptionsConfiguration;
  enabled: boolean;
  hiddenInput?: HTMLInputElement;
  output: Record<string, unknown>;
};

export type DeliveryOptionsStore = Store<DeliveryOptionsStoreState>;
