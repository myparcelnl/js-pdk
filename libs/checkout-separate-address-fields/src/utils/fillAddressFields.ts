import {type AddressType, PdkUtil, useUtil} from '@myparcel-dev/pdk-checkout-common';
import {type AllAddressFields, type AnyAddressField} from '../types';
import {triggerFormChange} from './triggerFormChange';

export const fillAddressFields = (address: Partial<AllAddressFields>, addressType?: AddressType): void => {
  const setFieldValue = useUtil(PdkUtil.SetFieldValue);

  Object.entries(address ?? {}).forEach(([fieldName, value]) => {
    if (!value) {
      return;
    }

    setFieldValue(fieldName as AnyAddressField, value, addressType, false);
  });

  triggerFormChange();
};
