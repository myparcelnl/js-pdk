import {FrontendPdkEndpointObject} from '@myparcel-pdk/common';
import {MyParcelDeliveryOptions} from '@myparcel/delivery-options';

export enum AddressType {
  Billing = 'billing',
  Shipping = 'shipping',
}

export enum PdkEvent {
  CheckoutUpdate = 'checkoutUpdate',
  CheckoutUpdated = 'checkoutUpdated',
  StoreInitialize = 'storeInitialize',
  StoreInitialized = 'storeInitialized',
}

export const ADDRESS_TYPES = [AddressType.Billing, AddressType.Shipping] as const;

export enum AddressField {
  Address1 = 'address1',
  City = 'city',
  Country = 'country',
  EoriNumber = 'eoriNumber',
  Number = 'number',
  NumberSuffix = 'numberSuffix',
  PostalCode = 'postalCode',
  Street = 'street',
  VatNumber = 'vatNumber',
}

export enum PdkField {
  ShippingMethod = 'shippingMethod',
  ToggleAddressType = 'toggleAddressType',
}

export type AddressFields = Record<AddressField, string>;

export type PdkCheckoutConfigInput = Omit<PdkCheckoutConfig, 'selectors'> & {
  selectors: Omit<PdkCheckoutConfig['selectors'], 'deliveryOptions'> & {
    deliveryOptions?: string;
  };
};

export type PdkCheckoutForm = Record<PdkField, string> & {
  [AddressType.Billing]: AddressFields;
  [AddressType.Shipping]: AddressFields;
};

export interface PdkCheckoutConfig {
  fields: PdkCheckoutForm;
  formData: PdkCheckoutForm;

  selectors: {
    deliveryOptions: string;
    deliveryOptionsWrapper: string;
    hasAddressType: string;
  };

  getForm(): HTMLFormElement;

  initialize(): Promise<void>;
}

export type InitializeCallback = () => void;

export interface PdkCheckout {
  onInitialize(callback: InitializeCallback): void;
}

export interface FrontendAppContext {
  checkout: {
    config: MyParcelDeliveryOptions.Config;
    strings: MyParcelDeliveryOptions.Strings;
    settings: FrontendSettings;
  };
}

export type FrontendSettings = {
  actions: {
    baseUrl: string;
    endpoints: FrontendPdkEndpointObject;
  };
  allowedShippingMethods: string[];
  carriersWithTaxFields: string[];
  hasDeliveryOptions: boolean;
  hiddenInputName: string;
  separateAddressFieldsCountries: string[];
  separateAddressFieldsEnabled: boolean;
};
