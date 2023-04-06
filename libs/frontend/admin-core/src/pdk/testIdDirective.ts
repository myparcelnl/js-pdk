import {Directive} from 'vue';

export const testIdDirective: Directive = (el, binding) => {
  if (import.meta.env.MODE !== 'test') {
    return;
  }

  el.setAttribute('data-test-id', binding.value);
};
