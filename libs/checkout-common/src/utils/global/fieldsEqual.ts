import {isEnumValue} from '@myparcel/ts-utils';
import {type AddressFields, type PdkCheckoutForm} from '../../types';
import {type AddressField, type AddressType, PdkField} from '../../data';
import {getAddressType} from './getAddressType';

type FieldsEqual = {
  (
    newFields: PdkCheckoutForm,
    oldFields: PdkCheckoutForm,
    addressFieldName: AddressField | string,
    addressType?: AddressType,
  ): boolean;
  (newFields: PdkCheckoutForm, oldFields: PdkCheckoutForm, fieldName: PdkField, arg4?: never): boolean;
};

export const fieldsEqual: FieldsEqual = (newFields, oldFields, arg3, arg4) => {
  newFields ??= {} as PdkCheckoutForm;
  oldFields ??= {} as PdkCheckoutForm;

  if (isEnumValue(arg3, PdkField)) {
    return newFields[arg3] === oldFields[arg3];
  }

  if (arg4 === undefined) {
    arg4 = getAddressType();
  }

  return newFields[arg4][arg3 as keyof AddressFields] === oldFields[arg4][arg3 as keyof AddressFields];
};
