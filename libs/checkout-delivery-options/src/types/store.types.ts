import {type Store} from '@myparcel-pdk/checkout-common';
import {type InputDeliveryOptionsConfiguration, type SupportedPackageTypeName} from '@myparcel/delivery-options';
import {type CheckoutDeliveryOptionsSettings} from './generic.types';

export type DeliveryOptionsStoreState = {
  settings: CheckoutDeliveryOptionsSettings;
  configuration: InputDeliveryOptionsConfiguration;
  enabled: boolean;
  hiddenInput?: HTMLInputElement;
  originalPackageType?: SupportedPackageTypeName;
  output: Record<string, unknown>;
};

export type DeliveryOptionsStore = Store<DeliveryOptionsStoreState>;
