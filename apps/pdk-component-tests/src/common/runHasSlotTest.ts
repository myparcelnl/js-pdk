import {expect, it} from 'vitest';
import {Component} from 'vue';
import {mount} from '@vue/test-utils';

export const runHasSlotTest = (component: Omit<Component, 'props'>, slot = 'default'): void => {
  it(`has slot #${slot}`, () => {
    const content = `SLOT CONTENT ${Math.ceil(Math.random() * 100)}`;

    const wrapper = mount(component, {
      slots: {
        [slot]: content,
      },
    });

    expect(wrapper.element.innerHTML).toContain(content);
  });
};
