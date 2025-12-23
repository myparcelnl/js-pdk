import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {isPackageTypeSmallPackage} from './isPackageTypeSmallPackage';
import {isPackageTypePackage} from './isPackageTypePackage';

export const isPackageTypePackageOrSmall = (form: FormInstance): boolean => {
  return isPackageTypePackage(form) || isPackageTypeSmallPackage(form);
};
