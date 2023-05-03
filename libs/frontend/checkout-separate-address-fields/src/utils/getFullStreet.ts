import {
  AddressField,
  AddressType,
  SEPARATE_ADDRESS_FIELDS,
  SEPARATE_ADDRESS_FIELDS_WITHOUT_SUFFIX,
  Util,
  useUtil,
} from '@myparcel-pdk/frontend-checkout-core/src';
import {hasSeparateAddressFields} from './hasSeparateAddressFields';

export const getFullStreet = (addressType: AddressType, withSuffix = false): string => {
  const getAddressFieldValue = useUtil(Util.GetAddressFieldValue);

  if (!hasSeparateAddressFields(addressType)) {
    return getAddressFieldValue(AddressField.Address1, addressType) ?? '';
  }

  const fields = withSuffix ? SEPARATE_ADDRESS_FIELDS : SEPARATE_ADDRESS_FIELDS_WITHOUT_SUFFIX;

  return fields
    .map((field) => getAddressFieldValue(field, addressType) ?? '')
    .join(' ')
    .trim();
};
