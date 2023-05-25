import {MountingOptions} from '@vue/test-utils';
import {ElementInstance, createFormElement} from '@myparcel-pdk/frontend-admin-core';
import {InteractiveElementConfiguration} from '@myparcel/vue-form-builder';

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
