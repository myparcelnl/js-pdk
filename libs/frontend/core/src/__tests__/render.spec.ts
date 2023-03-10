/* eslint-disable no-magic-numbers */
import {defineComponent, h, inject, onMounted} from 'vue';
import {describe, expect, it, vi} from 'vitest';
import {INJECT_GLOBAL_PDK_ADMIN} from '../data';
import {mount} from '@vue/test-utils';

describe.skip('rendering app pieces', () => {
  it('has unique context per piece', () => {
    const spy = vi.spyOn(console, 'log');

    const mockComponent2 = defineComponent({
      name: 'MC2',
      render: () => {
        const instance = inject(INJECT_GLOBAL_PDK_ADMIN);

        return h('div');
      },
    });

    const mockComponent = defineComponent({
      name: 'MockComponent',
      render: () => {
        const cb1 = h(
          'div',
          async () =>
            new Promise((resolve) => {
              resolve({default: mockComponent2});
            }),
        );

        onMounted(() => {
          /* eslint-disable @typescript-eslint/ban-ts-comment */
          // @ts-ignore
          cb1('#el1', {[ContextKey.OrderData]: {orderId: 1}});
          // @ts-ignore
          cb1('#el2', {[ContextKey.OrderData]: {orderId: 2}});
          // @ts-ignore
          cb1('#el3', {[ContextKey.OrderData]: {orderId: 3}});
          /* eslint-enable @typescript-eslint/ban-ts-comment */
        });

        return h('div', {}, [h('div', {id: 'el1'}), h('div', {id: 'el2'}), h('div', {id: 'el3'})]);
      },
    });

    const wrapper = mount(mockComponent);

    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenNthCalledWith(1, 1);
    expect(spy).toHaveBeenNthCalledWith(2, 2);
    expect(spy).toHaveBeenNthCalledWith(3, 3);
  });
});
