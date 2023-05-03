import {AddressField} from '@myparcel-pdk/frontend-checkout-core/src';
import {PartialAddressFields} from './splitAddress1';

const SPLIT_STREET_REGEX = /(.*?)\s?(\d{1,4})[/\s-]{0,2}([A-z]\d{1,3}|-\d{1,4}|\d{2}\w{1,2}|[A-z][A-z\s]{0,3})?$/;

export const splitAddress = (address?: string): PartialAddressFields => {
  const parts = address?.split(SPLIT_STREET_REGEX);

  const [, street, number, numberSuffix] = parts ?? [];

  return {
    [AddressField.Street]: street ?? '',
    [AddressField.Number]: number ?? '',
    [AddressField.NumberSuffix]: numberSuffix ?? '',
  };
};
