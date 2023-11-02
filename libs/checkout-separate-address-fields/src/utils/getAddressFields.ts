import {type AddressType, PdkUtil, useUtil} from '@myparcel-pdk/checkout-common';
import {type SeparateAddressFields} from '../types';
import {SEPARATE_ADDRESS_FIELDS} from '../constants';

export const getAddressFields = (addressType: AddressType): SeparateAddressFields => {
  const getAddressFieldValue = useUtil(PdkUtil.GetAddressFieldValue);

  return SEPARATE_ADDRESS_FIELDS.reduce(
    (acc, field) => ({
      ...acc,
      [field]: getAddressFieldValue(field, addressType) ?? '',
    }),
    {} as SeparateAddressFields,
  );
};
