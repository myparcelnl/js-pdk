import {type Store} from '@myparcel-dev/pdk-checkout-common';
import {type InputDeliveryOptionsConfiguration, type SupportedPackageTypeName} from '@myparcel-dev/delivery-options';
import {type CheckoutDeliveryOptionsSettings} from './generic.types';

export type DeliveryOptionsStoreState = {
  settings: CheckoutDeliveryOptionsSettings;

  /**
   * The configuration passed to the delivery options library, including the cart's active
   * shipment options from the checkout context.
   */
  configuration: InputDeliveryOptionsConfiguration;
  enabled: boolean;
  hiddenInput?: HTMLInputElement;
  originalPackageType?: SupportedPackageTypeName;
  output: Record<string, unknown>;
};

export type DeliveryOptionsStore = Store<DeliveryOptionsStoreState>;
