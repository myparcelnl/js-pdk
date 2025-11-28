import {type FormInstance} from '@myparcel/vue-form-builder';
import {PackageTypeName} from '@myparcel/constants';
import {FIELD_PACKAGE_TYPE} from '../shipmentOptions';

export const isPackageTypeSmallPackage = (form: FormInstance): boolean => {
  return PackageTypeName.PackageSmall === form.getValue(FIELD_PACKAGE_TYPE);
};
