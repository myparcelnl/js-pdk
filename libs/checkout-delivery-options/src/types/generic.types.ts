import {type InputDeliveryOptionsConfig} from '@myparcel/delivery-options';
import {type PackageTypeName} from '@myparcel/constants';
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

  /**
   * Get the package type based on the selected shipping method.
   */
  getPackageType(): PackageTypeName | undefined;

  updateDeliveryOptions(state: DeliveryOptionsStoreState): InputDeliveryOptionsConfig;
}
