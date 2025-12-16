import { type FormInstance } from '@myparcel-dev/vue-form-builder';
import { PackageTypeName } from '@myparcel-dev/constants';
import { FIELD_PACKAGE_TYPE } from '../shipmentOptions';

export const isPackageTypePackage = (form: FormInstance): boolean => {
  return PackageTypeName.Package === form.getValue(FIELD_PACKAGE_TYPE);
};
