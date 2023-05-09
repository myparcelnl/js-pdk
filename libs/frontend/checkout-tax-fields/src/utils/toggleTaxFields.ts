import {AddressField, Util, useCheckoutStore, useConfig, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {hasTaxFields} from './hasTaxFields';

export const toggleTaxFields = (): void => {
  const getAddressField = useUtil(Util.GetAddressField);

  const checkout = useCheckoutStore();
  const showTaxFields = hasTaxFields();
  const config = useConfig();

  checkout.state.addressTypes.forEach((addressType) => {
    [AddressField.EoriNumber, AddressField.VatNumber].forEach((fieldName) => {
      const field = getAddressField(fieldName, addressType, false);

      if (!field) {
        return;
      }

      console.log('toggleTaxFields', field, showTaxFields);
      config.toggleField(field, showTaxFields);
    });
  });
};
