import {useUtil} from '../useUtil';
import {useConfig} from '../useConfig';
import {type AddressField, type AddressType, PdkUtil} from '../../data';
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
      const triggerEvent = useUtil(PdkUtil.TriggerEvent);
      const config = useConfig();

      triggerEvent('change', undefined, config.getForm());
    }
  }
};
