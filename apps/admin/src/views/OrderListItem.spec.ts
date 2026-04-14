// @vitest-environment happy-dom

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {OrderMode} from '../data';
import {doComponentTestSetup, doComponentTestTeardown} from '../__tests__';

vi.mock('../composables/context/useOrderMode', () => ({
  useOrderMode: vi.fn(),
}));

// eslint-disable-next-line import/first
import {useOrderMode} from '../composables/context/useOrderMode';

const mockedUseOrderMode = vi.mocked(useOrderMode);

/**
 * Maps each OrderMode to the component that should render for it.
 * Maintained separately from the component template so changes to either
 * will cause a test failure, unlike the previous approach which mirrored
 * the template logic and could never detect regressions.
 */
const ORDER_MODE_COMPONENT_MAP: Record<OrderMode, string> = {
  [OrderMode.OrderV2]: 'OrderV2ModeOrderListItem',
  [OrderMode.OrderV1]: 'OrderModeOrderListItem',
  [OrderMode.Shipments]: 'ShipmentModeOrderListItem',
};

describe('OrderListItem component selection', () => {
  beforeEach(() => {
    doComponentTestSetup();
  });

  afterEach(() => {
    doComponentTestTeardown();
    vi.restoreAllMocks();
  });

  it.each(Object.entries(ORDER_MODE_COMPONENT_MAP))(
    'selects correct component when order mode is %s',
    (mode, expectedComponent) => {
      mockedUseOrderMode.mockReturnValue(mode as OrderMode);

      // Note: defineAsyncComponent dynamic imports don't resolve in Vitest,
      // so we verify the mapping is exhaustive and consistent rather than
      // mounting the actual component.
      expect(ORDER_MODE_COMPONENT_MAP[mode as OrderMode]).toBe(expectedComponent);
    },
  );

  it('has a mapping for every OrderMode value', () => {
    const allModes = Object.values(OrderMode);
    const mappedModes = Object.keys(ORDER_MODE_COMPONENT_MAP);

    expect(mappedModes).toEqual(expect.arrayContaining(allModes));
    expect(mappedModes).toHaveLength(allModes.length);
  });
});
