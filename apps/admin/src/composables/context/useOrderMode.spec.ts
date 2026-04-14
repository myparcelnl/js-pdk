import {describe, expect, it, vi} from 'vitest';
import {OrderMode, SubscriptionFeature} from '../../data';

vi.mock('./useContext', () => ({
  useContext: vi.fn(),
}));

// eslint-disable-next-line import/first
import {useContext} from './useContext';
// eslint-disable-next-line import/first
import {useOrderMode} from './useOrderMode';

const mockedUseContext = vi.mocked(useContext);

const mockAccount = (subscriptionFeatures: string[]) => {
  mockedUseContext.mockReturnValue({account: {subscriptionFeatures}} as any);
};

describe('useOrderMode', () => {
  it('returns OrderV2 when both ORDER_MANAGEMENT and LEGACY_ORDER_MANAGEMENT are present', () => {
    mockAccount([SubscriptionFeature.OrderManagement, SubscriptionFeature.LegacyOrderManagement]);
    expect(useOrderMode()).toBe(OrderMode.OrderV2);
  });

  it('returns OrderV2 when only ORDER_MANAGEMENT is present', () => {
    mockAccount([SubscriptionFeature.OrderManagement]);
    expect(useOrderMode()).toBe(OrderMode.OrderV2);
  });

  it('returns OrderV1 when only LEGACY_ORDER_MANAGEMENT is present', () => {
    mockAccount([SubscriptionFeature.LegacyOrderManagement]);
    expect(useOrderMode()).toBe(OrderMode.OrderV1);
  });

  it('returns Shipments when no order management features are present', () => {
    mockAccount([]);
    expect(useOrderMode()).toBe(OrderMode.Shipments);
  });

  it('returns Shipments when subscriptionFeatures contains unrelated features', () => {
    mockAccount(['SOME_OTHER_FEATURE', 'ANOTHER_FEATURE']);
    expect(useOrderMode()).toBe(OrderMode.Shipments);
  });

  it('returns Shipments when subscriptionFeatures is undefined', () => {
    mockedUseContext.mockReturnValue({account: {}} as any);
    expect(useOrderMode()).toBe(OrderMode.Shipments);
  });

  it('returns Shipments when account is undefined', () => {
    mockedUseContext.mockReturnValue({} as any);
    expect(useOrderMode()).toBe(OrderMode.Shipments);
  });
});