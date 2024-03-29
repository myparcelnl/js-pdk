import {expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runButtonTest = ((component) => {
  runCommonComponentTests(component);

  it('handles click event', async () => {
    expect.assertions(1);
    const wrapper = mount(component);
    const button = wrapper.find('button');

    button.element.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().click).toHaveLength(1);
  });

  it('can be disabled', async () => {
    expect.assertions(2);
    const wrapper = mount(component, {props: {disabled: true}});
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();

    button.element.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().click).toBeUndefined();
  });

  it('can display custom content', () => {
    const wrapper = mount(component, {slots: {default: 'Test'}});
    expect(wrapper.findAll('*').map((wrapper) => wrapper.text())).toContain('Test');
  });
}) satisfies AdminComponentTest;
