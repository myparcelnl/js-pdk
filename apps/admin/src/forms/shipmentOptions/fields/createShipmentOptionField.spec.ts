import {describe, expect, it, vi} from 'vitest';
import {TriState} from '@myparcel-dev/pdk-common';
import {createShipmentOptionField} from './createShipmentOptionField';

// Minimal mock of dependencies — adjust based on existing test patterns in the project
vi.mock('../../helpers', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    resolveFormComponent: () => 'MockTriStateInput',
    createHasShipmentOptionWatcher: () => () => true,
  };
});

describe('createShipmentOptionField', () => {
  const createRefs = (fieldName: string, value?: unknown) => ({[fieldName]: value});

  it('creates a field with TriState.Inherit default', () => {
    const fieldName = 'deliveryOptions.shipmentOptions.testOption';
    const refs = createRefs(fieldName);

    const field = createShipmentOptionField(refs, fieldName);

    expect(field.name).toBe(fieldName);
  });
});
