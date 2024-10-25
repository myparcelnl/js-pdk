import {type FormInstance} from '@myparcel/vue-form-builder';
import {PackageTypeName} from '@myparcel/constants';
import {getPackageTypeTranslation} from '../../utils/translations/getPackageTypeTranslation';
import {type SelectOption} from '../../types/form.types';
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
