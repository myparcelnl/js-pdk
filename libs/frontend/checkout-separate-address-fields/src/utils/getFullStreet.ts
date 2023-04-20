import {AddressField, AddressType, Util, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';

export const getFullStreet = (addressType: AddressType): string => {
  const getAddressField = useUtil(Util.GetAddressField);

  return [AddressField.Street, AddressField.Number]
    .reduce((acc, fieldName) => {
      const field = getAddressField(fieldName, addressType);

      if (field) {
        acc.push(field.value);
      }

      return acc;
    }, [] as string[])
    .join(' ')
    .trim();
};
