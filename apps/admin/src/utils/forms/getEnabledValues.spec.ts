import {describe, expect, it} from 'vitest';
import {ref, computed} from 'vue';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {getEnabledValues} from './getEnabledValues';

const createMockField = (name: string, value: unknown, isDisabled: boolean) => ({
  name,
  ref: ref(value),
  isDisabled: ref(isDisabled),
});

const createMockForm = (fields: ReturnType<typeof createMockField>[]): FormInstance => {
  const allValues: Record<string, unknown> = {};

  for (const field of fields) {
    allValues[field.name] = field.ref.value;
  }

  return {
    interactiveFields: computed(() => fields),
    getValues: () => allValues,
  } as unknown as FormInstance;
};

describe('getEnabledValues', () => {
  it('returns values from enabled fields only', () => {
    const form = createMockForm([
      createMockField('deliveryOptions.carrier', 'POSTNL', false),
      createMockField('deliveryOptions.shipmentOptions.requiresSignature', true, false),
      createMockField('deliveryOptions.shipmentOptions.requiresAgeVerification', true, true),
    ]);

    const values = getEnabledValues(form);

    expect(values).toEqual({
      'deliveryOptions.carrier': 'POSTNL',
      'deliveryOptions.shipmentOptions.requiresSignature': true,
    });
    expect(values).not.toHaveProperty('deliveryOptions.shipmentOptions.requiresAgeVerification');
  });

  it('returns all values when no fields are disabled', () => {
    const form = createMockForm([
      createMockField('deliveryOptions.carrier', 'POSTNL', false),
      createMockField('deliveryOptions.shipmentOptions.requiresSignature', true, false),
    ]);

    const values = getEnabledValues(form);

    expect(values).toEqual({
      'deliveryOptions.carrier': 'POSTNL',
      'deliveryOptions.shipmentOptions.requiresSignature': true,
    });
  });

  it('returns empty object when all fields are disabled', () => {
    const form = createMockForm([
      createMockField('deliveryOptions.shipmentOptions.requiresSignature', true, true),
      createMockField('deliveryOptions.shipmentOptions.requiresAgeVerification', false, true),
    ]);

    const values = getEnabledValues(form);

    expect(values).toEqual({});
  });
});
