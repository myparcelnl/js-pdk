import {type Replace} from '@myparcel/ts-utils';
import {type MyParcelDeliveryOptions} from '@myparcel/delivery-options';
import {type DeliveryOptionsStoreState} from './store';

export enum PdkDeliveryOptionsEvent {
  DeliveryOptionsUpdated = 'deliveryOptionsUpdated',
}

type ToRecord<T> = {
  [K in keyof T]: T[K];
};

// TODO: fix types in @myparcel/delivery-options, currently does not allow street.
export type DeliveryOptionsAddress = {
  cc: string;
  postalCode: string;
  street: string;
  city: string;
};

export type DeliveryOptionsConfiguration = Replace<
  ToRecord<MyParcelDeliveryOptions.Configuration>,
  'address',
  DeliveryOptionsAddress
>;

export type CheckoutDeliveryOptionsSettingsInput = Partial<CheckoutDeliveryOptionsSettings>;

export enum DeliveryOptionsMode {
  Single = 'single',
  Multi = 'multi',
}

export interface CheckoutDeliveryOptionsSettings {
  mode: DeliveryOptionsMode;

  updateDeliveryOptions(state: DeliveryOptionsStoreState): MyParcelDeliveryOptions.Config;
}
