import {FormInstance, InteractiveElementConfiguration} from '@myparcel/vue-form-builder/src';
import {ElementInstance} from '../../types';
import {ref} from 'vue';

export const createFormElement = (
  config: Partial<InteractiveElementConfiguration>,
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
