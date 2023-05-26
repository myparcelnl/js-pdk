import {Util, useUtil} from '../useUtil';
import {type AddressType, PdkField} from '../../types';
import {useConfig} from '../../config';

export const getAddressType = (): AddressType => {
  const getFieldValue = useUtil(Util.GetFieldValue);
  const config = useConfig();

  return config.getAddressType(getFieldValue(PdkField.AddressType));
};
