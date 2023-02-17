import {FormInstance, SelectOption} from '@myparcel/vue-form-builder';
import {PACKAGE_TYPES} from '@myparcel/sdk';
import {getCarrierOptions} from './getCarrierOptions';
import {useLanguage} from '../../../composables';

const PACKAGE_TYPE_NAMES = [
  PACKAGE_TYPES.PACKAGE_NAME,
  PACKAGE_TYPES.MAILBOX_NAME,
  PACKAGE_TYPES.DIGITAL_STAMP_NAME,
  PACKAGE_TYPES.LETTER_NAME,
] as const;

export const getPackageTypes = (form?: FormInstance): SelectOption[] => {
  let array = [...PACKAGE_TYPE_NAMES];
  const {translate} = useLanguage();

  if (form) {
    const carrierOptions = getCarrierOptions(form);

    array = array.filter((name) => carrierOptions?.capabilities.packageTypes.includes(name));
  }

  return array.map((name) => ({
    label: translate(`package_type_${name}`),
    value: name,
  }));
};
