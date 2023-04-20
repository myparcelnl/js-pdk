import {AddressField, AddressType, PdkCheckoutForm, PdkField} from '../../index';
import {isEnumValue} from '@myparcel/ts-utils';

type FieldsEqual = {
  (
    newFields: PdkCheckoutForm,
    oldFields: PdkCheckoutForm,
    addressFieldName: AddressField,
    addressType: AddressType,
  ): boolean;
  (newFields: PdkCheckoutForm, oldFields: PdkCheckoutForm, addressFieldName: PdkField, arg4?: never): boolean;
};

export const fieldsEqual: FieldsEqual = (newFields, oldFields, arg3, arg4) => {
  if (isEnumValue(arg3, PdkField)) {
    return newFields[arg3] === oldFields[arg3];
  }

  if (arg4 === undefined) {
    throw new Error();
  }

  return newFields[arg4][arg3] === oldFields[arg4][arg3];
};
