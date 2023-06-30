import {ref} from 'vue';
import {
  type ComponentOrHtmlElement,
  type ElementName,
  type FormInstance,
  type InteractiveElementConfiguration,
} from '@myparcel/vue-form-builder';
import {type ElementInstance, type PdkElementProps} from '../../types';

export const createFormElement = <
  RT = unknown,
  C extends ComponentOrHtmlElement = 'input',
  N extends ElementName = 'element',
>(
  config?: Partial<InteractiveElementConfiguration<C, N, RT>>,
  formName?: string,
): ElementInstance<PdkElementProps<C>, C, N, RT> => {
  const form = {
    name: formName ?? 'form',
  } as unknown as FormInstance;

  return {
    component: 'input',
    form,
    name: 'element',
    ref: ref(),
    ...config,
  } as unknown as ElementInstance<PdkElementProps<C>, C, N, RT>;
};
