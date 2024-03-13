import {type InputDeliveryOptionsConfig} from '@myparcel/delivery-options';
import {type DeliveryOptionsStoreState} from './store.types';

export enum PdkDeliveryOptionsEvent {
  DeliveryOptionsUpdated = 'deliveryOptionsUpdated',
}

export type CheckoutDeliveryOptionsSettingsInput = Partial<CheckoutDeliveryOptionsSettings>;

export enum DeliveryOptionsMode {
  Single = 'single',
  Multi = 'multi',
}

export interface CheckoutDeliveryOptionsSettings {
  mode: DeliveryOptionsMode;

  updateDeliveryOptions(state: DeliveryOptionsStoreState): InputDeliveryOptionsConfig;
}
