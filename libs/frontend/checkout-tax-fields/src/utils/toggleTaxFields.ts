import {ADDRESS_TYPES, AddressField, Util, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {hasTaxFields} from './hasTaxFields';

export const toggleTaxFields = (): void => {
  const showTaxFields = hasTaxFields();
  const getAddressField = useUtil(Util.GetAddressField);

  ADDRESS_TYPES.forEach((addressType) => {
    [AddressField.EoriNumber, AddressField.VatNumber].forEach((fieldName) => {
      const wrapper = getAddressField(fieldName, addressType, false);

      if (!wrapper) {
        return;
      }

      const $wrapper = jQuery(wrapper);

      if (showTaxFields) {
        $wrapper.show();
        return;
      }

      $wrapper.hide();
    });
  });
};
