import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {isPackageTypePackage} from './isPackageTypePackage';
import {isPackageTypeMailbox} from './isPackageTypeMailbox';

export const isPackageTypePackageOrMailbox = (form: FormInstance): boolean => {
  return isPackageTypePackage(form) || isPackageTypeMailbox(form);
};
