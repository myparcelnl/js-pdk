import {type FormInstance} from '@myparcel/vue-form-builder';
import {PackageTypeName} from '@myparcel/constants';
import {FIELD_PACKAGE_TYPE} from '../field';

export const isPackageTypePackage = (form: FormInstance): boolean => {
  return PackageTypeName.Package === form.getValue(FIELD_PACKAGE_TYPE);
};
