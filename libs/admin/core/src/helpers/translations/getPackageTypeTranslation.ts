import {type PackageTypeName} from '@myparcel/constants';
import {getDynamicTranslation} from './getDynamicTranslation';

export const getPackageTypeTranslation = (name?: PackageTypeName | string): string =>
  getDynamicTranslation('package_type', name);
