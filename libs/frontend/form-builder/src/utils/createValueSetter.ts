import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {type AnyVal} from '../types';

export type FormValueSetter = (target?: string, value?: AnyVal) => void;

export const createValueSetter = (instance: InteractiveElementInstance, prefix: string): FormValueSetter => {
  return (target, value) => {
    if (target) {
      instance.form.setValue(`${prefix}${target}`, value);
    } else {
      // @ts-expect-error todo
      instance.ref = value;
    }
  };
};
