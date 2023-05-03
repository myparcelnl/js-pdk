import {FrontendEndpoint, FrontendPdkEndpointObject} from '@myparcel-pdk/common/src';
import {FrontendEndpointResponse} from './types/endpoints.types';
import {MyParcelDeliveryOptions} from '@myparcel/delivery-options';
import {CarrierName} from '@myparcel/constants';

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

export const SEPARATE_ADDRESS_FIELDS = [AddressField.Street, AddressField.Number, AddressField.NumberSuffix] as const;

export const SEPARATE_ADDRESS_FIELDS_WITHOUT_SUFFIX = [AddressField.Street, AddressField.Number] as const;

export enum PdkField {
  ShippingMethod = 'shippingMethod',
  ToggleAddressType = 'toggleAddressType',
}

export type AddressFields = Record<AddressField, string>;

export type PdkCheckoutConfigInput = Omit<PdkCheckoutConfig, 'selectors' | 'onFormChange'> & {
  onFormChange?(callback: () => void): void;
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

  doRequest<E extends FrontendEndpoint>(
    endpoint: FrontendPdkEndpointObject[E] & {baseUrl: string},
  ): Promise<FrontendEndpointResponse<E>>;

  getForm(): HTMLFormElement;

  initialize(): Promise<void>;

  onFormChange(callback: () => void): void;

  toggleField(field: HTMLInputElement, show: boolean): void;
}

export type InitializeCallback = () => void;

export interface PdkCheckout {
  onInitialize(callback: InitializeCallback): void;
}

export interface CheckoutAppContext {
  checkout: {
    config: MyParcelDeliveryOptions.Config;
    strings: MyParcelDeliveryOptions.Strings;
    settings: CheckoutSettings;
  };
}

export type CheckoutSettings = {
  actions: {
    baseUrl: string;
    endpoints: FrontendPdkEndpointObject;
  };

  // Delivery options
  allowedShippingMethods: string[];
  hasDeliveryOptions: boolean;
  hiddenInputName: string;

  // Separate address fields
  countriesWithSeparateAddressFields: string[];

  // Tax fields
  carriersWithTaxFields: CarrierName[];
};
