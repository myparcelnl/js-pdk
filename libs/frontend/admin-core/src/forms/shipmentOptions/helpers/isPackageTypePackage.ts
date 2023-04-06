import {FormInstance} from '@myparcel/vue-form-builder/src';
import {PACKAGE_TYPE} from '../field';
import {PackageTypeName} from '@myparcel/constants';

export const isPackageTypePackage = (form: FormInstance): boolean => {
  return form.model[PACKAGE_TYPE].ref.value === PackageTypeName.Package;
};
