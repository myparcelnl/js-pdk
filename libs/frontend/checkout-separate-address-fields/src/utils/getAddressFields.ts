import {AddressType, Util, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {SEPARATE_ADDRESS_FIELDS} from '../constants';
import {SeparateAddressFields} from '../types';

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
