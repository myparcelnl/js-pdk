import {type FormInstance} from '@myparcel/vue-form-builder';
import {isOfType} from '@myparcel/ts-utils';
import {convertDotNotationToObject} from '../convertDotNotationToObject';

export const formToBody = <T extends Record<string, unknown> = Record<string, unknown>>(
  form?: false | FormInstance | T,
): T => {
  if (isOfType<FormInstance>(form, 'getValues')) {
    return convertDotNotationToObject(form.getValues(), (value) => {
      if (typeof value === 'boolean') {
        return value ? '1' : '0';
      }

      return value;
    }) as T;
  }

  return form ? form : ({} as T);
};
