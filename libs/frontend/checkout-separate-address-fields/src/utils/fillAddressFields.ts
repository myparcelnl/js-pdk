import {
  AddressField,
  AddressFields,
  AddressType,
  Util,
  useConfig,
  useUtil,
} from '@myparcel-pdk/frontend-checkout-core/src';

export const fillAddressFields = (address: Partial<AddressFields>, addressType?: AddressType): void => {
  const setFieldValue = useUtil(Util.SetFieldValue);
  const triggerEvent = useUtil(Util.TriggerEvent);

  Object.entries(address).forEach(([fieldName, value]) => {
    if (!value) {
      return;
    }

    setFieldValue(fieldName as AddressField, value, addressType, false);
  });

  triggerEvent('change', undefined, useConfig().getForm());
};
