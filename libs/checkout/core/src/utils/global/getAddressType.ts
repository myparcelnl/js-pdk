import {type AddressType, PdkField} from '@myparcel-pdk/checkout-common';
import {useUtil, Util} from '../useUtil';
import {useConfig} from '../../config';

export const getAddressType = (): AddressType => {
  const getFieldValue = useUtil(Util.GetFieldValue);
  const config = useConfig();

  return config.getAddressType(getFieldValue(PdkField.AddressType));
};
