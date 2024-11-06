import {type AddressField, type AddressFields} from '@myparcel-pdk/checkout-common';
import {type SeparateAddressField} from './constants';

export type AnyAddressField = AddressField | SeparateAddressField;

export type SeparateAddressFields = Record<SeparateAddressField, string>;

export type AllAddressFields = AddressFields & SeparateAddressFields;
