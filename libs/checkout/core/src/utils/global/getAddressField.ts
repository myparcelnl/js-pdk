import {type AddressField, type AddressType} from '@myparcel-pdk/checkout-common';
import {useUtil, Util} from '../useUtil';
import {useCheckoutStore} from '../useCheckoutStore';
import {useConfig} from '../../config';

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
  const getElement = useUtil(Util.GetElement);

  // @ts-expect-error todo
  return getElement(config.fields[resolvedAddressType][name], warn);
};
