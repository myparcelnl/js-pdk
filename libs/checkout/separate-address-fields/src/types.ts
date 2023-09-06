import {type AddressField, type AddressFields} from '@myparcel-pdk/checkout-core';

export enum SeparateAddressField {
  Street = 'street',
  Number = 'number',
  NumberSuffix = 'numberSuffix',
}

export type AnyAddressField = AddressField | SeparateAddressField;

export type SeparateAddressFields = Record<SeparateAddressField, string>;

export type AllAddressFields = AddressFields & SeparateAddressFields;
