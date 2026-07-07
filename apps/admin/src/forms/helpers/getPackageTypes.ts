import {type CarrierModel} from '@myparcel-dev/pdk-common';
import {getPackageTypeTranslation} from '../../utils';
import {type SelectOption} from '../../types';

export const getPackageTypes = (carrier: CarrierModel | undefined): SelectOption[] => {
  if (!carrier) {
    return [];
  }

  return carrier.packageTypes.map((packageType) => ({
    label: getPackageTypeTranslation(packageType),
    value: packageType,
  }));
};
