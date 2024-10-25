import {beforeEach, describe, expect, it} from 'vitest';
import {AddressType} from '../data/address';
import {hasAddressTypeSpy} from '../__tests__/spies';
import {mockPdkCheckout} from '../__tests__/mockPdkCheckout';
import {hasAddressType} from './hasAddressType';

describe('hasAddressType', () => {
  beforeEach(async () => {
    await mockPdkCheckout();
  });

  it('should return true if the address type is enabled', () => {
    hasAddressTypeSpy.mockReturnValueOnce(true);

    expect(hasAddressType(AddressType.Shipping)).toBe(true);
  });

  it('should return false if the address type is disabled', () => {
    hasAddressTypeSpy.mockReturnValueOnce(false);

    expect(hasAddressType(AddressType.Billing)).toBe(false);
  });
});
