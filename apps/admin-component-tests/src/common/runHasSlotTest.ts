import {expect, it} from 'vitest';
import {PartialComponentTest} from '../types';
import {mount} from '@vue/test-utils';

/**
 * Checks if the html content passed to the slot exists anywhere in the component.
 */
export const runHasSlotTest: PartialComponentTest = (component, options, slot = 'default') => {
  it(`has slot #${slot}`, () => {
    const content = `SLOT CONTENT ${Math.ceil(Math.random() * 100)}`;

    const wrapper = mount(component, {
      ...options,
      slots: {
        ...options?.slots,
        // @ts-expect-error slots are not typed
        [slot]: content,
      },
    });

    expect(wrapper.element.innerHTML).toContain(content);
  });
};
