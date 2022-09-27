/* eslint-disable no-magic-numbers */
import {defineComponent, h, inject, onMounted, render} from 'vue';
import {describe, expect, it, vi} from 'vitest';
import {ContextKey} from '@myparcel/pdk-frontend-shared';
import {INJECT_GLOBAL_PDK_FRONTEND} from '../data/injections';
import {mount} from '@vue/test-utils';

describe.skip('rendering app pieces', () => {
  it('has unique context per piece', () => {
    const spy = vi.spyOn(console, 'log');

    const MockComponent2 = defineComponent({
      name: 'MC2',
      render: () => {
        const instance = inject(INJECT_GLOBAL_PDK_FRONTEND);

        // eslint-disable-next-line no-console
        console.log(instance?.config.context.orderIdentifier);
        return h('div');
      },
    });

    const MockComponent = defineComponent({
      name: 'MockComponent',
      render: () => {
        const cb1 = render(
          'test',
          async () =>
            new Promise((resolve) => {
              resolve({default: MockComponent2});
            }),
        );

        onMounted(() => {
          /* eslint-disable @typescript-eslint/ban-ts-comment */
          // @ts-ignore
          cb1('#el1', {[ContextKey.ORDER_DATA]: {orderId: 1}});
          // @ts-ignore
          cb1('#el2', {[ContextKey.ORDER_DATA]: {orderId: 2}});
          // @ts-ignore
          cb1('#el3', {[ContextKey.ORDER_DATA]: {orderId: 3}});
          /* eslint-enable @typescript-eslint/ban-ts-comment */
        });

        return h('div', {}, [h('div', {id: 'el1'}), h('div', {id: 'el2'}), h('div', {id: 'el3'})]);
      },
    });

    const wrapper = mount(MockComponent);

    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenNthCalledWith(1, 1);
    expect(spy).toHaveBeenNthCalledWith(2, 2);
    expect(spy).toHaveBeenNthCalledWith(3, 3);
  });
});
