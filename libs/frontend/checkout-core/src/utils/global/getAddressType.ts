import {PdkField, useConfig, useUtil} from '@myparcel-pdk/frontend-checkout-core';
import {AddressType} from '../../types';
import {Util} from '../../utils';

export const getAddressType = (): AddressType => {
  const getFieldValue = useUtil(Util.GetFieldValue);
  const config = useConfig();

  return config.getAddressType(getFieldValue(PdkField.AddressType));
};
