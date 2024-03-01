import {isRef} from 'vue';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {type AnyVal} from '../types';

export type FormValueSetter = (value: AnyVal, target?: string) => void;

export const createValueSetter = (instance: InteractiveElementInstance, prefix: string): FormValueSetter => {
  return (value, target) => {
    if (target) {
      instance.form.setValue(`${prefix}${target}`, value);
    } else {
      if (isRef(instance.ref)) {
        instance.ref.value = value;
        return;
      }

      // @ts-expect-error todo
      instance.ref = value;
    }
  };
};
