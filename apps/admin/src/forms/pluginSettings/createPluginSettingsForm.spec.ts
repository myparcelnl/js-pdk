import {describe, expect, it} from 'vitest';
import {resolveSettingsValues} from './resolveSettingsValues';

describe('resolveSettingsValues', () => {
  const pluginSettings = {
    order: {
      conceptShipments: true,
      processDirectly: '-1',
    },
    carrier: {
      '*': {
        exportSignature: 0,
        exportAgeCheck: 0,
        allowSignature: true,
        allowOnlyRecipient: true,
      },
      POSTNL: {
        exportSignature: 1,
        exportAgeCheck: 0,
        allowSignature: true,
        allowOnlyRecipient: false,
      },
    },
  };

  // Direct match — carrier-specific settings exist.
  it('returns carrier-specific values when they exist', () => {
    const values = resolveSettingsValues(pluginSettings, 'carrier.POSTNL');

    expect(values).toEqual(pluginSettings.carrier.POSTNL);
  });

  // Wildcard fallback — no carrier-specific settings saved yet.
  it('falls back to wildcard values when carrier key does not exist', () => {
    const values = resolveSettingsValues(pluginSettings, 'carrier.DHL_FOR_YOU');

    expect(values).toEqual(pluginSettings.carrier['*']);
  });

  // Top-level key without sub-keys — no wildcard needed.
  it('resolves top-level settings directly', () => {
    const values = resolveSettingsValues(pluginSettings, 'order');

    expect(values).toEqual(pluginSettings.order);
  });

  // Neither specific key nor wildcard exists — returns empty object.
  it('returns empty object when neither key nor wildcard exists', () => {
    const values = resolveSettingsValues(pluginSettings, 'nonexistent.section');

    expect(values).toEqual({});
  });

  // Carrier-specific values take precedence over wildcard.
  it('does not merge wildcard — carrier-specific values fully override', () => {
    const values = resolveSettingsValues(pluginSettings, 'carrier.POSTNL');

    // POSTNL has allowOnlyRecipient: false, wildcard has true.
    // Should use the carrier-specific value, not the wildcard.
    expect(values).toHaveProperty('allowOnlyRecipient', false);
  });
});
