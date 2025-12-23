import {isEnumValue} from '@myparcel-dev/ts-utils';
import {useCheckoutStore} from '../useCheckoutStore';
import {type PdkCheckoutForm} from '../../types';
import {type AddressField, type AddressType, PdkField} from '../../data';

type GetFieldValue = {
  (field: AddressField | string, addressType?: AddressType, fields?: PdkCheckoutForm): undefined | string;
  (field: PdkField | string, fields?: PdkCheckoutForm, arg3?: never): undefined | string;
};

export const getFieldValue: GetFieldValue = (name, arg2, arg3) => {
  const checkout = useCheckoutStore();

  if (isEnumValue(name, PdkField)) {
    const object = (arg2 as PdkCheckoutForm) ?? checkout.state.form;

    return object[name]?.trim();
  }

  const object = arg3 ?? checkout.state.form;
  const addressType = (arg2 ?? checkout.state.addressType) as AddressType;

  return object[addressType]?.[name as AddressField]?.trim();
};
