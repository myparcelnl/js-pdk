import {PdkField, useConfig, useUtil} from '@myparcel-pdk/frontend-checkout-core';
import {Util} from '../../utils';
import {AddressType} from '../../types';

export const getAddressType = (): AddressType => {
  const getFieldValue = useUtil(Util.GetFieldValue);
  const config = useConfig();

  return config.getAddressType(getFieldValue(PdkField.AddressType));
};
