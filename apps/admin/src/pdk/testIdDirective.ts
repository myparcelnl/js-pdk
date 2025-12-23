import {type Directive} from 'vue';
import {isDefined} from '@vueuse/core';
import {type FieldInstance} from '@myparcel-dev/vue-form-builder';

const SEPARATOR = '--';

type TestIdBinding = string | string[] | [string, FieldInstance];

export const testIdDirective: Directive<Element, TestIdBinding> = (el, binding) => {
  if (import.meta.env.MODE !== 'test') {
    return;
  }

  let testId: string;

  if (Array.isArray(binding.value)) {
    const filtered = binding.value.filter(isDefined);

    const bindings =
      typeof filtered[1] === 'string' ? (filtered as string[]) : [filtered[0], filtered[1]?.name as string];

    testId = bindings.filter(isDefined).join(SEPARATOR);
  } else {
    testId = binding.value;
  }

  el.setAttribute('data-test-id', testId);
};
