import {describe, expect, it, vi} from 'vitest';
import {OrderMode, SubscriptionFeature} from '../../data';
import {useOrderMode} from './useOrderMode';
import {useContext} from './useContext';

vi.mock('./useContext', () => ({
  useContext: vi.fn(),
}));

const mockedUseContext = vi.mocked(useContext);

const mockAccount = (subscriptionFeatures: string[]) => {
  mockedUseContext.mockReturnValue({account: {subscriptionFeatures}} as any);
};

describe('useOrderMode', () => {
  it('returns OrderV2 when both ORDER_MANAGEMENT and LEGACY_ORDER_MANAGEMENT are present', () => {
    mockAccount([SubscriptionFeature.OrderManagement, SubscriptionFeature.LegacyOrderManagement]);
    expect(useOrderMode().value).toBe(OrderMode.OrderV2);
  });

  it('returns OrderV2 when only ORDER_MANAGEMENT is present', () => {
    mockAccount([SubscriptionFeature.OrderManagement]);
    expect(useOrderMode().value).toBe(OrderMode.OrderV2);
  });

  it('returns OrderV1 when only LEGACY_ORDER_MANAGEMENT is present', () => {
    mockAccount([SubscriptionFeature.LegacyOrderManagement]);
    expect(useOrderMode().value).toBe(OrderMode.OrderV1);
  });

  it('returns Shipments when no order management features are present', () => {
    mockAccount([]);
    expect(useOrderMode().value).toBe(OrderMode.Shipments);
  });

  it('returns Shipments when subscriptionFeatures contains unrelated features', () => {
    mockAccount(['SOME_OTHER_FEATURE', 'ANOTHER_FEATURE']);
    expect(useOrderMode().value).toBe(OrderMode.Shipments);
  });

  it('returns Shipments when subscriptionFeatures is undefined', () => {
    mockedUseContext.mockReturnValue({account: {}} as any);
    expect(useOrderMode().value).toBe(OrderMode.Shipments);
  });

  it('returns Shipments when account is undefined', () => {
    mockedUseContext.mockReturnValue({} as any);
    expect(useOrderMode().value).toBe(OrderMode.Shipments);
  });
});
