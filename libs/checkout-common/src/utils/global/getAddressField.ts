import {useUtil} from '../useUtil';
import {useConfig} from '../useConfig';
import {useCheckoutStore} from '../useCheckoutStore';
import {type AddressField, type AddressType, PdkUtil} from '../../data';

/**
 * Get field by name. Will return element with selector: "#<billing|shipping>_<name>".
 */
export const getAddressField = (
  name: AddressField | string,
  addressType?: AddressType,
  warn = true,
): HTMLInputElement | null => {
  const resolvedAddressType = addressType ?? useCheckoutStore().state.addressType;

  const config = useConfig();
  const getElement = useUtil(PdkUtil.GetElement);

  // @ts-expect-error todo
  return getElement(config.fields[resolvedAddressType][name], warn);
};
