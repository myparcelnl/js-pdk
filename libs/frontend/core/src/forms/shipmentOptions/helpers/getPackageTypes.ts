import {FormInstance} from '@myparcel/vue-form-builder/src';
import {PackageTypeName} from '@myparcel/constants';
import {SelectOption} from '@myparcel-pdk/common/src';
import {getCarrierOptions} from './getCarrierOptions';

export const getPackageTypes = (form?: FormInstance): SelectOption[] => {
  let array = Object.values(PackageTypeName);

  if (form) {
    const carrierOptions = getCarrierOptions(form);

    array = array.filter((name) => carrierOptions?.capabilities.packageTypes.includes(name));
  }

  return array.map((name) => ({
    label: `package_type_${name}`,
    value: name,
  }));
};
