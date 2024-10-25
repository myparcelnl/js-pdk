import {useUtil} from '../utils/useUtil';
import {useConfig} from '../utils/useConfig';
import {type CheckoutStoreState, type StoreCallbackUpdate} from '../types/store.types';
import {PdkUtil} from '../data/utils';
import {PdkField} from '../data/address';

export const updateAddressType: StoreCallbackUpdate<CheckoutStoreState> = (newState, oldState) => {
  const fieldsEqual = useUtil(PdkUtil.FieldsEqual);

  if (!oldState || fieldsEqual(newState.form, oldState.form, PdkField.AddressType)) {
    return;
  }

  newState.addressType = useConfig().getAddressType(newState.form[PdkField.AddressType]);
};
