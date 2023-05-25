import {SeparateAddressField, SeparateAddressFields} from '../types';
import {SPLIT_STREET_REGEX} from '../constants';

export const splitFullStreet = (address?: string): SeparateAddressFields => {
  const parts = address?.split(SPLIT_STREET_REGEX);

  const [, street, number, numberSuffix] = parts ?? [];

  return {
    [SeparateAddressField.Street]: street ?? '',
    [SeparateAddressField.Number]: number ?? '',
    [SeparateAddressField.NumberSuffix]: numberSuffix ?? '',
  };
};
