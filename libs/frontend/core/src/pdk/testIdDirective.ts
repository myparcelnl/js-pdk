import {Directive} from 'vue';

export const testIdDirective: Directive = (el, binding) => {
  if (typeof binding.value !== 'string') {
    throw new Error('testIdDirective: value must be a string');
  }

  el.setAttribute('data-test-id', binding.value);
};
