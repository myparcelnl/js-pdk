import {PackageTypeName} from '@myparcel/constants';

export const getPackageTypeTranslation = (name: PackageTypeName | string): string => {
  return `package_type_${name}`;
};
