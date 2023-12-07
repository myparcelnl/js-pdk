import {expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import {type PartialComponentTest} from '../types';

/**
 * Checks if the html content passed to the slot exists anywhere in the component.
 */
export const runHasSlotTest = ((component, options = undefined, slot = 'default') => {
  it(`has slot #${slot}`, () => {
    const content = `SLOT CONTENT ${Math.ceil(Math.random() * 100)}`;

    const wrapper = mount(component as any, {
      ...options,
      slots: {
        ...(options?.slots as any),
        [slot]: () => content,
      },
    });

    expect(wrapper.element.innerHTML).toContain(content);
  });
}) satisfies PartialComponentTest<[] | [string]>;
