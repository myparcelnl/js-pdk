import {type PackageTypeName} from '@myparcel-dev/constants';
import {getDynamicTranslation} from './getDynamicTranslation';

export const getPackageTypeTranslation = (name?: PackageTypeName | string): string =>
  getDynamicTranslation('package_type', name);
