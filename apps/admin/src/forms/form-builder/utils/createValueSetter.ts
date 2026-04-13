import {isRef} from 'vue';
import {type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';
import {type AnyVal} from '../types';

export type FormValueSetter = (value: AnyVal, target?: string) => void;

/**
 * Set a field's ref value, handling both Vue Ref and raw value cases.
 *
 * The vue-form-builder component render replaces `field.ref` with a raw
 * value after the first render cycle, so we can't always rely on
 * `field.ref.value = x` — we need to check and fall back to direct assignment.
 */
const setFieldRef = (field: InteractiveElementInstance, value: AnyVal): void => {
  if (isRef(field.ref)) {
    field.ref.value = value;
  } else {
    // @ts-expect-error ref was replaced with a raw value by the component render
    field.ref = value;
  }
};

export const createValueSetter = (instance: InteractiveElementInstance, prefix: string): FormValueSetter => {
  return (value, target) => {
    if (target) {
      const targetField = instance.form.getField(`${prefix}${target}`) as InteractiveElementInstance | undefined;

      if (targetField) {
        setFieldRef(targetField, value);
      }
    } else {
      setFieldRef(instance, value);
    }
  };
};
