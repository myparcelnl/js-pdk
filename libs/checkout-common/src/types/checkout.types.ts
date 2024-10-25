import {type FrontendEndpoint} from '@myparcel-pdk/common';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type AddressType, type PdkField} from '../data/address';
import {type FrontendEndpointData, type FrontendEndpointResponse} from './endpoints.types';
import {type AddressFields} from './address.types';

export type PdkFormData = Record<string, FormDataEntryValue | undefined>;

export type PdkCheckoutConfigInput = Omit<
  PdkCheckoutConfig,
  'selectors' | 'formChange' | 'getFormData' | 'getAddressType' | 'hasDeliveryOptions'
> & {
  formChange?(callback: () => void): void;
  getAddressType?(value: unknown): AddressType;
  getFormData?(): PdkFormData;
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
  doRequest<E extends FrontendEndpoint>(endpoint: FrontendEndpointData<E>): Promise<FrontendEndpointResponse<E>>;

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
  getFormData(): PdkFormData;

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
