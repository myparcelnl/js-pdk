import {describe, expect, it} from 'vitest';
import {OrderMode, resolveOrderMode, SubscriptionFeature} from './orderMode';

describe('resolveOrderMode', () => {
  it('returns OrderV2 when both ORDER_MANAGEMENT and LEGACY_ORDER_MANAGEMENT are present', () => {
    expect(resolveOrderMode([SubscriptionFeature.OrderManagement, SubscriptionFeature.LegacyOrderManagement])).toBe(
      OrderMode.OrderV2,
    );
  });

  it('returns OrderV2 when only ORDER_MANAGEMENT is present', () => {
    expect(resolveOrderMode([SubscriptionFeature.OrderManagement])).toBe(OrderMode.OrderV2);
  });

  it('returns OrderV1 when only LEGACY_ORDER_MANAGEMENT is present', () => {
    expect(resolveOrderMode([SubscriptionFeature.LegacyOrderManagement])).toBe(OrderMode.OrderV1);
  });

  it('returns Shipments when no features are present', () => {
    expect(resolveOrderMode([])).toBe(OrderMode.Shipments);
  });
});
