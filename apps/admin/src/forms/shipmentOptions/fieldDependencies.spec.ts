import {describe, expect, it} from 'vitest';
import {getFieldDependencies} from './fieldDependencies';

describe('getFieldDependencies', () => {
  it('returns dependencies for a known carrier and option', () => {
    const deps = getFieldDependencies('POSTNL', 'requiresAgeVerification');
    expect(deps).toEqual({
      requires: ['recipientOnlyDelivery', 'requiresSignature'],
      excludes: ['requiresReceiptCode'],
    });
  });

  it('returns undefined for a carrier with no dependencies', () => {
    const deps = getFieldDependencies('unknownCarrier', 'requiresAgeVerification');
    expect(deps).toBeUndefined();
  });

  it('returns undefined for an option with no dependencies', () => {
    const deps = getFieldDependencies('POSTNL', 'someUnknownOption');
    expect(deps).toBeUndefined();
  });

  it('returns DHL_FOR_YOU ageVerification dependencies', () => {
    const deps = getFieldDependencies('DHL_FOR_YOU', 'requiresAgeVerification');
    expect(deps).toEqual({
      excludes: ['requiresSignature'],
    });
  });

  it('returns DHL_FOR_YOU recipientOnlyDelivery dependencies', () => {
    const deps = getFieldDependencies('DHL_FOR_YOU', 'recipientOnlyDelivery');
    expect(deps).toEqual({
      excludes: ['requiresAgeVerification'],
    });
  });

  it('returns DHL_FOR_YOU requiresReceiptCode dependencies', () => {
    const deps = getFieldDependencies('DHL_FOR_YOU', 'requiresReceiptCode');
    expect(deps).toEqual({
      excludes: ['requiresAgeVerification'],
    });
  });
});
