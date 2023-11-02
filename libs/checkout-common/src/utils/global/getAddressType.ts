import {useUtil} from '../useUtil';
import {useConfig} from '../useConfig';
import {type AddressType, PdkField, PdkUtil} from '../../data';

export const getAddressType = (): AddressType => {
  const getFieldValue = useUtil(PdkUtil.GetFieldValue);
  const config = useConfig();

  return config.getAddressType(getFieldValue(PdkField.AddressType));
};
