import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {FIELD_PACKAGE_TYPE} from '../shipmentOptions';

// @TODO Remove package type validators when the context provides visibility restrictions per option.
export const isPackageTypeSmallPackage = (form: FormInstance): boolean => {
  return form.getValue(FIELD_PACKAGE_TYPE) === 'SMALL_PACKAGE';
};
