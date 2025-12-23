import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {PackageTypeName} from '@myparcel-dev/constants';
import {getPackageTypeTranslation} from '../../utils';
import {type SelectOption} from '../../types';
import {getCarrier} from './getCarrier';

export const getPackageTypes = (form?: FormInstance): SelectOption[] => {
  let array = Object.values(PackageTypeName);

  if (form) {
    const carrier = getCarrier(form);
    array = array.filter((name) => carrier?.capabilities.packageTypes.includes(name));
  }

  return array.map((name) => ({
    label: getPackageTypeTranslation(name),
    value: name,
  }));
};
