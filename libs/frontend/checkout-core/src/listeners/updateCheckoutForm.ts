import {AddressField, AddressType, PdkCheckoutForm, PdkField, getAddressType, useConfig} from '../index';
import {useCheckoutStore} from '../utils';

function getEntry(data: Record<string, FormDataEntryValue>, value: undefined | string): string {
  return (data[value as string] as string | undefined) ?? '';
}

export const updateCheckoutForm = (): void => {
  const checkout = useCheckoutStore();
  const config = useConfig();

  const data = config.getFormData();

  const transformedData = {
    [AddressType.Billing]: {},
    [AddressType.Shipping]: {},
  } as PdkCheckoutForm;

  checkout.state.addressTypes.forEach((addressType) => {
    Object.entries(config.formData[addressType]).forEach(([key, value]) => {
      transformedData[addressType][key as AddressField] = getEntry(data, value);
    });
  });

  Object.entries(config.formData).forEach(([key, value]) => {
    if (checkout.state.addressTypes.includes(key as AddressType)) {
      return;
    }

    transformedData[key as PdkField] = getEntry(data, value as string);
  });

  void checkout.set({
    addressType: getAddressType(),
    form: Object.freeze({...transformedData}),
  });
};
