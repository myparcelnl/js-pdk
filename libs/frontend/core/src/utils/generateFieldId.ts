import {AnyElementInstance} from '@myparcel/vue-form-builder';
import {UnwrapNestedRefs} from 'vue';

export const generateFieldId = (element: UnwrapNestedRefs<AnyElementInstance>): string => {
  return `${element.form.name}-${element.name}`;
};
