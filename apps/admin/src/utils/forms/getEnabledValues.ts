import {toValue} from 'vue';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';

type FormValues = Record<string, unknown>;

/**
 * Returns form values excluding disabled fields.
 *
 * Works around a vue-form-builder bug where `getValues()` retains stale
 * values from fields that became disabled after initialisation (e.g. when
 * switching carriers hides unsupported shipment options).
 */
export const getEnabledValues = <T extends FormValues = FormValues>(form: FormInstance): T => {
  const values: FormValues = {};

  for (const field of toValue(form.interactiveFields)) {
    if (toValue(field.isDisabled)) {
      continue;
    }

    values[field.name] = toValue(field.ref);
  }

  return values as T;
};
