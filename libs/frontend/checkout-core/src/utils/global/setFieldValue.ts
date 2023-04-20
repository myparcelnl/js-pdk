import {AddressField, AddressType} from '../../types';
import {Util, useUtil} from '../useUtil';
import {getAddressField} from './getAddressField';
import {useConfig} from '../../config';

export const setFieldValue = (
  name: AddressField,
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
