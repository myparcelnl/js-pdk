import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {PackageTypeName} from '@myparcel-dev/constants';
import {FIELD_PACKAGE_TYPE} from '../shipmentOptions';

export const isPackageTypeMailbox = (form: FormInstance): boolean => {
  return PackageTypeName.Mailbox === form.getValue(FIELD_PACKAGE_TYPE);
};
