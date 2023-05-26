import {type SelectOption} from '@myparcel-pdk/common';
import {type FormInstance} from '@myparcel/vue-form-builder';
import {PackageTypeName} from '@myparcel/constants';
import {getPackageTypeTranslation} from '../../../helpers';
import {getCarrierOptions} from './getCarrierOptions';

export const getPackageTypes = (form?: FormInstance): SelectOption[] => {
  let array = Object.values(PackageTypeName);

  if (form) {
    const carrierOptions = getCarrierOptions(form);

    array = array.filter((name) => carrierOptions?.capabilities.packageTypes.includes(name));
  }

  return array.map((name) => ({
    label: getPackageTypeTranslation(name),
    value: name,
  }));
};
