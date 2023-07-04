import {get} from '@vueuse/core';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';

export const createFormStateWatcher =
  (option: Record<string, unknown>, prefix: string): ((field: InteractiveElementInstance) => boolean) =>
  (field: InteractiveElementInstance) => {
    return Object.entries(option).every(([fieldName, value]) => {
      return get(field.form.model[prefix + fieldName]?.ref) === value;
    });
  };
