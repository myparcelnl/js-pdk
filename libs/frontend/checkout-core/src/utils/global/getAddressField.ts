import {AddressField, Util, useConfig, useUtil} from '../../index';
import {AddressType} from '../../types';
import {useCheckoutStore} from '../useCheckoutStore';

/**
 * Get field by name. Will return element with selector: "#<billing|shipping>_<name>".
 */
export const getAddressField = (
  name: AddressField,
  addressType?: AddressType,
  warn = true,
): HTMLInputElement | null => {
  const resolvedAddressType = addressType ?? useCheckoutStore().state.addressType;

  const config = useConfig();
  const getElement = useUtil(Util.GetElement);

  return getElement(config.fields[resolvedAddressType][name], warn);
};
