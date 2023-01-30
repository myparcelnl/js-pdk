import {Directive} from 'vue';

export const testIdDirective: Directive = (el, binding) => {
  if (binding.instance?.$options.name) {
    el.setAttribute('data-test-component', binding.instance.$options.name);
  }

  if (typeof binding.value === 'string') {
    el.setAttribute('data-test-id', binding.value);
    return;
  }

  if (typeof binding.value === 'object') {
    const {name, ...rest} = binding.value;

    if (name) {
      el.setAttribute('data-test', name);
    }

    Object.entries(rest).forEach(([key, value]) => {
      el.setAttribute(`data-test-${key}`, value);
    });
  }
};
