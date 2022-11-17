import {expect, it} from 'vitest';
import {Component} from 'vue';
import {shallowMount} from '@vue/test-utils';

export const runHasSlotTest = (component: Omit<Component, 'props'>, slot = 'default'): void => {
  it(`has slot "${slot}"`, () => {
    const content = `Slot content ${Math.ceil(Math.random() * 100)}`;
    const wrapper = shallowMount(component, {slots: {[slot]: content}});

    expect(wrapper.element.innerHTML).toContain(content);
  });
};
