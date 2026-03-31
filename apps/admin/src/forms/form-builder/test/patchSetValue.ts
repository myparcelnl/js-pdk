import {isRef} from 'vue';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';

/**
 * Workaround for vue-form-builder setValue bug: Vue's reactive system auto-unwraps refs nested
 * inside reactive arrays, so field.ref returns the raw value instead of the Ref object.
 */
export const patchSetValue = (form: FormInstance): void => {
  const original = form.setValue.bind(form);
  form.setValue = (name: string | number | symbol, value: unknown) => {
    if (typeof name !== 'string') {
      original(name, value);
      return;
    }

    const field = form.getField(name);

    if (field && 'ref' in field && !isRef(field.ref)) {
      (field as unknown as Record<string, unknown>).ref = value;
      return;
    }

    original(name, value);
  };
};
