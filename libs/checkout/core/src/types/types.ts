import {type FrontendEndpoint, type FrontendPdkEndpointObject} from '@myparcel-pdk/checkout-common';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type MyParcelDeliveryOptions} from '@myparcel/delivery-options';
import {type CarrierName} from '@myparcel/constants';
import {type FrontendEndpointResponse} from './types/endpoints.types';

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
  PostalCode = 'postalCode',
}

export enum PdkField {
  AddressType = 'addressType',
  ShippingMethod = 'shippingMethod',
}

export type AddressFields = Record<AddressField, string>;

export type PdkCheckoutConfigInput = Omit<
  PdkCheckoutConfig,
  'selectors' | 'formChange' | 'getFormData' | 'getAddressType' | 'hasDeliveryOptions'
> & {
  formChange?(callback: () => void): void;
  getAddressType?(value: unknown): AddressType;
  getFormData?(): Record<string, FormDataEntryValue>;
  hasDeliveryOptions?(shippingMethod: string): PromiseOr<boolean>;
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
  };

  /**
   * Do a request to the backend.
   */
  doRequest<E extends FrontendEndpoint>(
    endpoint: FrontendPdkEndpointObject[E] & {baseUrl: string},
  ): Promise<FrontendEndpointResponse<E>>;

  /**
   * The handler for the form change event.
   */
  formChange(callback: () => void): void;

  /**
   * Get the address type that is currently active.
   */
  getAddressType(value: unknown): AddressType;

  /**
   * Get the form element.
   */
  getForm(): HTMLFormElement;

  /**
   * Get the form data.
   */
  getFormData(): Record<string, FormDataEntryValue>;

  /**
   * Check if the address type is available.
   */
  hasAddressType(addressType: AddressType): boolean;

  /**
   * Check if the delivery options are available for the shipping method.
   */
  hasDeliveryOptions(shippingMethod: string): PromiseOr<boolean>;

  /**
   * Callback that is called when the checkout is initialized.
   */
  initialize(): Promise<void>;

  /**
   * Toggle showing/hiding a field.
   */
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