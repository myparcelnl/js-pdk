import {AddressType, Util, useUtil} from '@myparcel-pdk/frontend-checkout-core';
import {SeparateAddressFields} from '../types';
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
