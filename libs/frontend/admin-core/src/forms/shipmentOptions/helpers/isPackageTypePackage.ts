import {type FormInstance} from '@myparcel/vue-form-builder';
import {PackageTypeName} from '@myparcel/constants';
import {PACKAGE_TYPE} from '../field';

export const isPackageTypePackage = (form: FormInstance): boolean => {
  return form.getValue(PACKAGE_TYPE) === PackageTypeName.Package;
};
