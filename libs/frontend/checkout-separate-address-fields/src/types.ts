import {AddressField, AddressFields} from '@myparcel-pdk/frontend-checkout-core/src';

export enum SeparateAddressField {
  Street = 'street',
  Number = 'number',
  NumberSuffix = 'numberSuffix',
}

export type AnyAddressField = AddressField | SeparateAddressField;

export type SeparateAddressFields = Record<SeparateAddressField, string>;

export type AllAddressFields = AddressFields & SeparateAddressFields;
