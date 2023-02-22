import {FormInstance} from '@myparcel/vue-form-builder/src';
import {PACKAGE_TYPE} from '../field';
import {PACKAGE_TYPES} from '@myparcel/sdk';

export const isPackageTypePackage = (form: FormInstance): boolean => {
  return form.model[PACKAGE_TYPE].ref.value === PACKAGE_TYPES.PACKAGE_NAME;
};
