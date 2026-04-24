// @vitest-environment happy-dom

import {computed, reactive, ref} from 'vue';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {config, mount} from '@vue/test-utils';
import {OrderMode} from '../data';
import {useOrderMode} from '../composables/context/useOrderMode';
import {doComponentTestSetup, doComponentTestTeardown} from '../__tests__';
import OrderListItem from './OrderListItem.vue';

vi.mock('../composables/context/useOrderMode', () => ({
  useOrderMode: vi.fn(),
}));

vi.mock('../composables/orders/useOrderData', () => ({
  useOrderData: vi.fn(() => ({
    order: computed(() => ({externalIdentifier: 'TEST-1'})),
    query: reactive({data: ref({externalIdentifier: 'TEST-1'}), isLoading: false}),
  })),
}));

vi.mock('../stores', async (importOriginal) => ({
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  ...(await importOriginal<typeof import('../stores')>()),
  useActionStore: vi.fn(() => ({
    registerOrderActions: vi.fn(),
  })),
  useQueryStore: vi.fn(() => ({
    registerContextQueries: vi.fn(),
    registerOrderQueries: vi.fn(),
  })),
}));

const mockedUseOrderMode = vi.mocked(useOrderMode);

describe('OrderListItem component selection', () => {
  beforeEach(() => {
    doComponentTestSetup();

    config.global.stubs.OrderV2ModeOrderListItem = true;
    config.global.stubs.OrderModeOrderListItem = true;
    config.global.stubs.ShipmentModeOrderListItem = true;
  });

  afterEach(() => {
    doComponentTestTeardown();
  });

  it.each([
    [OrderMode.OrderV2, 'order-v2-mode-order-list-item-stub'],
    [OrderMode.OrderV1, 'order-mode-order-list-item-stub'],
    [OrderMode.Shipments, 'shipment-mode-order-list-item-stub'],
  ] as const)('renders the correct component for %s mode', (mode, expectedStubTag) => {
    mockedUseOrderMode.mockReturnValue(computed(() => mode));
    const wrapper = mount(OrderListItem);

    expect(wrapper.find(expectedStubTag).exists()).toBe(true);
  });

  it('has a component for every OrderMode value', () => {
    const allModes = Object.values(OrderMode);

    for (const mode of allModes) {
      mockedUseOrderMode.mockReturnValue(computed(() => mode));
      const wrapper = mount(OrderListItem);
      const div = wrapper.find('div');

      expect(div.exists(), `Expected a rendered component for ${mode} mode`).toBe(true);
      expect(div.element.children.length, `Expected a child component for ${mode} mode`).toBeGreaterThan(0);
    }
  });
});
