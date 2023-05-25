import {Util, useCheckoutStore, useConfig, useUtil} from '@myparcel-pdk/frontend-checkout-core';
import {TaxField} from '../types';
import {hasTaxFields} from './hasTaxFields';

export const toggleTaxFields = (): void => {
  const getAddressField = useUtil(Util.GetAddressField);

  const checkout = useCheckoutStore();
  const showTaxFields = hasTaxFields();
  const config = useConfig();

  checkout.state.addressTypes.forEach((addressType) => {
    [TaxField.EoriNumber, TaxField.VatNumber].forEach((fieldName) => {
      const field = getAddressField(fieldName, addressType, false);

      if (!field) {
        return;
      }

      config.toggleField(field, showTaxFields);
    });
  });
};
