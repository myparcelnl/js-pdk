import {type ComponentMountingOptions} from '@vue/test-utils';
import {createFormElement, type ElementInstance} from '@myparcel-pdk/admin';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';

export const createInputOptions = <T>(
  modelValue?: T,
  options?: Partial<InteractiveElementConfiguration>,
): ComponentMountingOptions<{
  element: ElementInstance;
  modelValue?: T;
}> => ({
  props: {
    element: createFormElement(options),
    ...(modelValue !== undefined && {modelValue}),
  },
});
