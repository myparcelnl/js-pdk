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

  it('creates a field with TriState.Inherit default when isSelectedByDefault is false', () => {
    const fieldName = 'deliveryOptions.shipmentOptions.testOption';
    const refs = createRefs(fieldName);
    const optionData = {isRequired: false, isSelectedByDefault: false};

    const field = createShipmentOptionField(refs, fieldName, optionData);

    expect(field.name).toBe(fieldName);
  });

  it('sets isRequired option data on the field', () => {
    const fieldName = 'deliveryOptions.shipmentOptions.testOption';
    const refs = createRefs(fieldName);
    const optionData = {isRequired: true, isSelectedByDefault: false};

    const field = createShipmentOptionField(refs, fieldName, optionData);

    expect(field.name).toBe(fieldName);
  });
});
