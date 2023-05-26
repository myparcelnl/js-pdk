import {useCheckoutStore} from '../useCheckoutStore';
import {type AddressType} from '../../types';
import {type AddressField, Util, useConfig, useUtil} from '../../index';

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
