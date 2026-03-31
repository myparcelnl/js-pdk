import {isRef} from 'vue';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';

/**
 * Workaround for vue-form-builder setValue bug: Vue's reactive system auto-unwraps refs nested
 * inside reactive arrays, so field.ref returns the raw value instead of the Ref object.
 */
export const patchSetValue = (form: FormInstance): void => {
  const original = form.setValue.bind(form);
  form.setValue = (name: string, value: unknown) => {
    const field = form.getField(name);

    if (field && !isRef(field.ref)) {
      (field as Record<string, unknown>).ref = value;
      return;
    }

    original(name, value);
  };
};
