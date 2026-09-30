import {type InputDeliveryOptionsConfig} from '@myparcel-dev/delivery-options';
import {type PackageTypeName} from '@myparcel-dev/constants';
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

  /**
   * Return the delivery options config for the given state. Read the state from the argument, not from
   * the store: updateContext calls this with the new checkout context before it is in the store.
   */
  updateDeliveryOptions(state: DeliveryOptionsStoreState): InputDeliveryOptionsConfig;
}
