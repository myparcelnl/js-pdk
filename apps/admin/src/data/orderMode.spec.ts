import {describe, expect, it} from 'vitest';
import {OrderMode, resolveOrderMode} from './orderMode';

describe('resolveOrderMode', () => {
  it('returns OrderV2 when orderV2=true and orderV1=true', () => {
    expect(resolveOrderMode(true, true)).toBe(OrderMode.OrderV2);
  });

  it('returns OrderV2 when orderV2=true and orderV1=false', () => {
    expect(resolveOrderMode(false, true)).toBe(OrderMode.OrderV2);
  });

  it('returns OrderV1 when orderV1=true and orderV2=false', () => {
    expect(resolveOrderMode(true, false)).toBe(OrderMode.OrderV1);
  });

  it('returns Shipments when both are false', () => {
    expect(resolveOrderMode(false, false)).toBe(OrderMode.Shipments);
  });
});
