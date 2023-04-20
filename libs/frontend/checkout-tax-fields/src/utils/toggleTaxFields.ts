import {ADDRESS_TYPES, AddressField, Util, useConfig, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {hasTaxFields} from './hasTaxFields';

export const toggleTaxFields = (): void => {
  const showTaxFields = hasTaxFields();
  const getAddressField = useUtil(Util.GetAddressField);
  const config = useConfig();

  ADDRESS_TYPES.forEach((addressType) => {
    [AddressField.EoriNumber, AddressField.VatNumber].forEach((fieldName) => {
      const field = getAddressField(fieldName, addressType, false);

      if (!field) {
        return;
      }

      config.toggleField(field, showTaxFields);
    });
  });
};
