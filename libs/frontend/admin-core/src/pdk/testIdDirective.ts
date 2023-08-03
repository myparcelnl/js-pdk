import {type Directive} from 'vue';
import {isDefined} from '@vueuse/core';
import {type AnyElementInstance} from '@myparcel/vue-form-builder';

const SEPARATOR = '--';

type TestIdBinding = string | string[] | [string, AnyElementInstance | string];

export const testIdDirective: Directive<Element, TestIdBinding> = (el, binding) => {
  if (import.meta.env.MODE !== 'test') {
    return;
  }

  let testId: string;

  if (Array.isArray(binding.value)) {
    const bindings =
      typeof binding.value[1] === 'string'
        ? (binding.value as string[])
        : [binding.value[0], binding.value[1].name as string];

    testId = bindings.filter(isDefined).join(SEPARATOR);
  } else {
    testId = binding.value;
  }

  el.setAttribute('data-test-id', testId);
};
