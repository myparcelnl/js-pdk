import {type AddressField, type AddressType} from '@myparcel-pdk/checkout-common';
import {useUtil, Util} from '../useUtil';
import {useConfig} from '../../config';
import {getAddressField} from './getAddressField';

export const setFieldValue = (
  name: AddressField | string,
  value?: string,
  addressType?: AddressType,
  dispatchEvent = true,
): void => {
  const field = getAddressField(name, addressType);

  if (field) {
    field.value = value ?? '';

    if (dispatchEvent) {
      const triggerEvent = useUtil(Util.TriggerEvent);
      const config = useConfig();

      triggerEvent('change', undefined, config.getForm());
    }
  }
};
