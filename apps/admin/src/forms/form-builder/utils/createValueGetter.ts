import {toValue} from 'vue';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {type AnyVal} from '../types';

export type FormValueGetter = (target?: string) => AnyVal;

export const createValueGetter = (instance: InteractiveElementInstance, prefix: string): FormValueGetter => {
  return (target?: string): AnyVal => {
    if (target) {
      return instance.form.getValue(`${prefix}${target}`);
    }

    // @ts-expect-error todo
    return toValue(instance.ref);
  };
};
