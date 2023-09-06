import {useUtil, Util} from '../utils';
import {PdkField} from '../types';
import {type CheckoutStoreState, type StoreCallbackUpdate} from '../store';
import {useConfig} from '../config';

export const updateAddressType: StoreCallbackUpdate<CheckoutStoreState> = (newState, oldState) => {
  const fieldsEqual = useUtil(Util.FieldsEqual);

  if (!oldState || fieldsEqual(newState.form, oldState.form, PdkField.AddressType)) {
    return;
  }

  newState.addressType = useConfig().getAddressType(newState.form[PdkField.AddressType]);
};
