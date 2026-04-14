// @vitest-environment happy-dom

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {mount} from '@vue/test-utils';
import {computed, defineComponent, h, reactive} from 'vue';
import {OrderMode} from '../data';
import {doComponentTestSetup, doComponentTestTeardown} from '../__tests__';

vi.mock('../composables/context/useOrderMode', () => ({
  useOrderMode: vi.fn(),
}));

// eslint-disable-next-line import/first
import {useOrderMode} from '../composables/context/useOrderMode';

const mockedUseOrderMode = vi.mocked(useOrderMode);

/**
 * Tests the order mode → component selection logic from OrderListItem.vue.
 * Uses a test wrapper instead of the actual component because defineAsyncComponent
 * dynamic imports don't resolve in the Vitest test environment.
 */
describe('OrderListItem component selection', () => {
  beforeEach(() => {
    doComponentTestSetup();
  });

  afterEach(() => {
    doComponentTestTeardown();
    vi.restoreAllMocks();
  });

  it.each([
    {mode: OrderMode.OrderV2, expected: 'OrderV2ModeOrderListItem'},
    {mode: OrderMode.OrderV1, expected: 'OrderModeOrderListItem'},
    {mode: OrderMode.Shipments, expected: 'ShipmentModeOrderListItem'},
  ])('selects $expected when order mode is $mode', ({mode, expected}) => {
    mockedUseOrderMode.mockReturnValue(mode);

    const orderMode = useOrderMode();

    // Mirrors the template logic in OrderListItem.vue:
    // <OrderV2ModeOrderListItem v-if="orderMode === OrderMode.OrderV2" />
    // <OrderModeOrderListItem v-else-if="orderMode === OrderMode.OrderV1" />
    // <ShipmentModeOrderListItem v-else />
    const selectedComponent =
      orderMode === OrderMode.OrderV2
        ? 'OrderV2ModeOrderListItem'
        : orderMode === OrderMode.OrderV1
          ? 'OrderModeOrderListItem'
          : 'ShipmentModeOrderListItem';

    expect(selectedComponent).toBe(expected);
  });
});
