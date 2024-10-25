import {get} from '@vueuse/core';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {type AnyVal} from '../types/common.types';

export type FormValueGetter = (target?: string) => AnyVal;

export const createValueGetter = (instance: InteractiveElementInstance, prefix: string): FormValueGetter => {
  return (target?: string): AnyVal => {
    if (target) {
      return instance.form.getValue(`${prefix}${target}`);
    }

    // @ts-expect-error todo
    return get(instance.ref);
  };
};
