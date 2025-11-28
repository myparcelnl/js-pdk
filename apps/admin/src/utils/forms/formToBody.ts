import {type FormInstance} from '@myparcel/vue-form-builder';
import {isOfType} from '@myparcel/ts-utils';
import {convertDotNotationToObject} from '../convertDotNotationToObject';

export const formToBody = <T extends Record<string, unknown> = Record<string, unknown>>(
  form?: false | FormInstance | T,
): T => {
  if (!isOfType<FormInstance>(form, 'getValues')) {
    return form ? form : ({} as T);
  }

  const formValues = form.getValues();
  return convertDotNotationToObject(formValues, (value) => {
    return typeof value === 'boolean' ? Number(value) : value;
  }) as T;
};
