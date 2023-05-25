import {ref} from 'vue';
import {FormInstance, InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {ElementInstance} from '../../types';

export const createFormElement = (
  config?: Partial<InteractiveElementConfiguration>,
  formName?: string,
): ElementInstance => {
  const form = {
    name: formName ?? 'form',
  } as unknown as FormInstance;

  return {
    component: 'input',
    form,
    name: 'element',
    ref: ref(),
    ...config,
  } as unknown as ElementInstance;
};
