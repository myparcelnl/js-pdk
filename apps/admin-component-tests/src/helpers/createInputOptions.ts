import {ElementInstance, createFormElement} from '@myparcel-pdk/frontend-admin-core';
import {InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {MountingOptions} from '@vue/test-utils';

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
