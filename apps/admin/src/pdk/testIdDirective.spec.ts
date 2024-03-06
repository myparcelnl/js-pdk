import {describe, expect, it} from 'vitest';
import {shallowMount} from '@vue/test-utils';
import {testIdDirective} from './testIdDirective';

/**
 * @vitest-environment happy-dom
 */

const mountWrapper = (template: string) => {
  return shallowMount(
    {
      template,
    },
    {global: {directives: {test: testIdDirective}}},
  );
};

describe('testIdDirective', () => {
  it('handles plain string', () => {
    const wrapper = mountWrapper(`<div v-test="'test'"></div>`);

    expect(wrapper.find('div').attributes('data-test-id')).toBe('test');
  });

  it('handles string array', () => {
    const wrapper = mountWrapper(`<div v-test="['test', 'test2']"></div>`);

    expect(wrapper.find('div').attributes('data-test-id')).toBe('test--test2');
  });

  it('handles string + element', () => {
    const wrapper = mountWrapper(`<div v-test="['test', {name: 'test2'}]"></div>`);

    expect(wrapper.find('div').attributes('data-test-id')).toBe('test--test2');
  });

  it('handles undefined', () => {
    const wrapper = mountWrapper(`<div v-test="['test', undefined]"></div>`);

    expect(wrapper.find('div').attributes('data-test-id')).toBe('test');
  });
});
