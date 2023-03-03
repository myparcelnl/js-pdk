import {FormInstance, SelectOption} from '@myparcel/vue-form-builder/src';
import {PackageTypeName} from '@myparcel/constants';
import {getCarrierOptions} from './getCarrierOptions';
import {useLanguage} from '../../../composables';

export const getPackageTypes = (form?: FormInstance): SelectOption[] => {
  let array = Object.values(PackageTypeName);
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
