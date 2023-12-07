import {ref} from 'vue';
import {type FormInstance, type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {type ElementInstance, type PdkElementProps} from '../../types';

export const createFormElement = <Type = unknown>(
  config?: Partial<InteractiveElementConfiguration<Type>>,
  formName?: string,
): ElementInstance<Type, PdkElementProps<Type>> => {
  const form = {
    name: formName ?? 'form',
  } as unknown as FormInstance;

  return {
    component: 'input',
    form,
    name: 'element',
    ref: ref(),
    ...config,
  } as unknown as ElementInstance<Type, PdkElementProps<Type>>;
};
