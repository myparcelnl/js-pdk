import {useUtil} from '../useUtil';
import {useConfig} from '../useConfig';
import {PdkUtil} from '../../data/utils';
import {type AddressType, PdkField} from '../../data/address';

export const getAddressType = (): AddressType => {
  const getFieldValue = useUtil(PdkUtil.GetFieldValue);
  const config = useConfig();

  return config.getAddressType(getFieldValue(PdkField.AddressType));
};
