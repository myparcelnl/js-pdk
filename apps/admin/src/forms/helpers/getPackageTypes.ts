import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {getPackageTypeTranslation} from '../../utils';
import {type SelectOption} from '../../types';
import {getCarrier} from './getCarrier';

export const getPackageTypes = (form: FormInstance): SelectOption[] => {
  const carrier = getCarrier(form);

  if (!carrier) {
    return [];
  }

  return carrier.packageTypes.map((packageType) => ({
    label: getPackageTypeTranslation(packageType),
    value: packageType,
  }));
};
