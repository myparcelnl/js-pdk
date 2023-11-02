import {useConfig, useUtil} from '../utils';
import {type CheckoutStoreState, type StoreCallbackUpdate} from '../types';
import {PdkField, PdkUtil} from '../data';

export const updateAddressType: StoreCallbackUpdate<CheckoutStoreState> = (newState, oldState) => {
  const fieldsEqual = useUtil(PdkUtil.FieldsEqual);

  if (!oldState || fieldsEqual(newState.form, oldState.form, PdkField.AddressType)) {
    return;
  }

  newState.addressType = useConfig().getAddressType(newState.form[PdkField.AddressType]);
};
