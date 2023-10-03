import {useUtil, Util} from '@myparcel-pdk/checkout-core';
import {type AddressType} from '@myparcel-pdk/checkout-common';
import {type SeparateAddressFields} from '../types';
import {SEPARATE_ADDRESS_FIELDS} from '../constants';

export const getAddressFields = (addressType: AddressType): SeparateAddressFields => {
  const getAddressFieldValue = useUtil(Util.GetAddressFieldValue);

  return SEPARATE_ADDRESS_FIELDS.reduce(
    (acc, field) => ({
      ...acc,
      [field]: getAddressFieldValue(field, addressType) ?? '',
    }),
    {} as SeparateAddressFields,
  );
};
