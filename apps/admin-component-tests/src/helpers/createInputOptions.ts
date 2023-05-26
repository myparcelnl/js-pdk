import {type MountingOptions} from '@vue/test-utils';
import {type ElementInstance, createFormElement} from '@myparcel-pdk/frontend-admin-core';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';

export const createInputOptions = <T>(
  modelValue?: T,
  options?: Partial<InteractiveElementConfiguration>,
): MountingOptions<{
  element: ElementInstance;
  modelValue?: T;
}> => ({
  props: {
    element: createFormElement(options),
    ...(modelValue !== undefined && {modelValue}),
  },
});
