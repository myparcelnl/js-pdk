import {FormInstance} from '@myparcel/vue-form-builder';
import {convertDotNotationToObject} from './convertDotNotationToObject';

export const formToBody = <T extends Record<string, unknown> = Record<string, unknown>>(form?: FormInstance): T => {
  console.log('formToBody', form);
  return convertDotNotationToObject(form?.getValues() ?? {}, (value) => {
    if (typeof value === 'boolean') {
      return value ? '1' : '0';
    }

    return value;
  }) as T;
};
