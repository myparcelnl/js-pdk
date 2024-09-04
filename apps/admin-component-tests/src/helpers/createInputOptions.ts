import {type Component as ComponentType} from 'vue';
import {createFormElement} from '@myparcel-pdk/admin';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {type TestComponentMountingOptions} from '../types';

export const createInputOptions = <
  T,
  Component extends ComponentType = ComponentType,
  Options extends Record<string, unknown> = Record<string, unknown>,
>(
  modelValue?: T,
  options?: Partial<InteractiveElementConfiguration>,
): TestComponentMountingOptions<Component, Options> =>
  ({
    props: {
      element: createFormElement(options),
      ...(modelValue === undefined ? {} : {modelValue}),
    },
  } as TestComponentMountingOptions<Component, Options>);
