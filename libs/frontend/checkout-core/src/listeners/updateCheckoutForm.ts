import {ADDRESS_TYPES, AddressField, AddressType, PdkCheckoutForm, PdkField, useConfig} from '../index';
import {useCheckoutStore} from '../utils';

function getEntry(data: Record<string, FormDataEntryValue>, value: undefined | string): string {
  return (data[value as string] as string | undefined) ?? '';
}

export const updateCheckoutForm = (event: Event): void => {
  const formData = new FormData(event.currentTarget as HTMLFormElement);
  const data = Object.fromEntries(formData.entries());

  const checkout = useCheckoutStore();
  const config = useConfig();

  const transformedData = {
    [AddressType.Billing]: {},
    [AddressType.Shipping]: {},
  } as PdkCheckoutForm;

  ADDRESS_TYPES.forEach((addressType) => {
    Object.entries(config.formData[addressType]).forEach(([key, value]) => {
      transformedData[addressType][key as AddressField] = getEntry(data, value);
    });
  });

  Object.entries(config.formData).forEach(([key, value]) => {
    if (ADDRESS_TYPES.includes(key as AddressType)) {
      return;
    }

    transformedData[key as PdkField] = getEntry(data, value as string);
  });

  checkout.set({form: transformedData});
};
