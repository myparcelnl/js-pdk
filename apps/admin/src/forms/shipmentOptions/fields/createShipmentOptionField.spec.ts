import {describe, expect, it, vi} from 'vitest';
import {ref} from 'vue';
import {TriState} from '@myparcel-dev/pdk-common';
import {type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';
import {createShipmentOptionField} from './createShipmentOptionField';

/**
 * Mutable carrier context — tests set this to control what `getCarrier()`
 * and `hasShipmentOption()` return without needing per-test mock overrides.
 */
let mockCarrier: Record<string, unknown> | undefined;

// Full mock (no importOriginal) to avoid the Vue file import chain
// that triggers "Install @vitejs/plugin-vue" errors.
vi.mock('../../helpers', () => ({
  resolveFormComponent: () => 'MockTriStateInput',
  createHasShipmentOptionWatcher: () => () => true,
  defineFormField: (config: Record<string, unknown>) => config,
  getFieldLabel: (name: string) => name,
  getCarrier: () => mockCarrier,
  hasShipmentOption: (_form: unknown, option: string) => {
    return Object.hasOwn(mockCarrier?.options as Record<string, unknown> ?? {}, option);
  },
}));

/**
 * Stub the dependency map so the tests don't depend on the real carrier
 * dependency data, which may change over time.
 *
 * POSTNL → requiresAgeVerification requires signature + only-recipient,
 *          excludes receiptCode. This mirrors the real-world POSTNL rules.
 */
vi.mock('../fieldDependencies', () => ({
  getFieldDependencies: (carrierName: string, optionName: string) => {
    if (carrierName === 'POSTNL' && optionName === 'requiresAgeVerification') {
      return {
        requires: ['recipientOnlyDelivery', 'requiresSignature'],
        excludes: ['requiresReceiptCode'],
      };
    }

    return undefined;
  },
}));

/** Create a minimal mock field instance with a reactive ref and mutable props. */
const createMockField = (name: string, fieldValue = TriState.Inherit) => {
  return {
    name,
    ref: ref(fieldValue),
    form: {} as never,
    props: {readOnly: false, disabled: false},
  } as unknown as InteractiveElementInstance;
};

/** Create a mock form that resolves fields by name from the given list. */
const createMockForm = (fields: InteractiveElementInstance[]) => {
  return {
    getField: (name: string) => fields.find((f) => f.name === name),
    getValue: () => undefined,
  };
};

describe('createShipmentOptionField', () => {
  const createRefs = (fieldName: string, value?: unknown) => ({[fieldName]: value});

  it('creates a field with TriState.Inherit default', () => {
    const fieldName = 'deliveryOptions.shipmentOptions.testOption';
    const refs = createRefs(fieldName);

    const field = createShipmentOptionField(refs, fieldName);

    expect(field.name).toBe(fieldName);
  });

  describe('afterUpdate dependency logic', () => {
    /**
     * Helper that creates a POSTNL carrier context, sets up the dependent
     * fields, and returns everything needed to invoke afterUpdate on the
     * age verification field.
     *
     * @param optionOverrides - per-option overrides merged into the default
     *   carrier options (e.g. `{ requiresSignature: { isRequired: true } }`)
     */
    const setupAgeVerificationScenario = (
      optionOverrides: Record<string, Record<string, unknown>> = {},
    ) => {
      const defaultOptions: Record<string, Record<string, unknown>> = {
        requiresAgeVerification: {isRequired: false, isSelectedByDefault: false},
        requiresSignature: {isRequired: false, isSelectedByDefault: false},
        recipientOnlyDelivery: {isRequired: false, isSelectedByDefault: false},
        requiresReceiptCode: {isRequired: false, isSelectedByDefault: false},
      };

      mockCarrier = {
        carrier: 'POSTNL',
        options: {...defaultOptions, ...optionOverrides},
      };

      const signatureField = createMockField('deliveryOptions.shipmentOptions.requiresSignature');
      const onlyRecipientField = createMockField('deliveryOptions.shipmentOptions.recipientOnlyDelivery');
      const receiptCodeField = createMockField('deliveryOptions.shipmentOptions.requiresReceiptCode');
      const form = createMockForm([signatureField, onlyRecipientField, receiptCodeField]);

      const fieldName = 'deliveryOptions.shipmentOptions.requiresAgeVerification';
      const config = createShipmentOptionField(createRefs(fieldName), fieldName);

      const triggerAfterUpdate = (value: TriState) => {
        const ageCheckField = {
          ...createMockField(fieldName, value),
          form,
        } as unknown as InteractiveElementInstance;

        config.afterUpdate!(ageCheckField, value, undefined);
      };

      return {signatureField, onlyRecipientField, receiptCodeField, triggerAfterUpdate};
    };

    // Enabling 18+ check should force signature + only-recipient ON and lock them.
    it('forces required-dependency fields ON and readOnly when source is enabled', () => {
      const {signatureField, onlyRecipientField, triggerAfterUpdate} = setupAgeVerificationScenario();

      triggerAfterUpdate(TriState.On);

      expect(signatureField.ref.value).toBe(TriState.On);
      expect(signatureField.props.readOnly).toBe(true);
      expect(onlyRecipientField.ref.value).toBe(TriState.On);
      expect(onlyRecipientField.props.readOnly).toBe(true);
    });

    // Enabling 18+ check should force receipt code OFF and lock it.
    it('forces excluded-dependency fields OFF and readOnly when source is enabled', () => {
      const {receiptCodeField, triggerAfterUpdate} = setupAgeVerificationScenario();

      triggerAfterUpdate(TriState.On);

      expect(receiptCodeField.ref.value).toBe(TriState.Off);
      expect(receiptCodeField.props.readOnly).toBe(true);
    });

    // Disabling 18+ check should unlock dependent fields so the user can edit them again.
    it('clears readOnly on dependent fields when source is disabled', () => {
      const {signatureField, onlyRecipientField, receiptCodeField, triggerAfterUpdate} =
        setupAgeVerificationScenario();

      // First enable to lock the fields…
      triggerAfterUpdate(TriState.On);
      // …then disable to unlock them.
      triggerAfterUpdate(TriState.Off);

      expect(signatureField.props.readOnly).toBe(false);
      expect(onlyRecipientField.props.readOnly).toBe(false);
      expect(receiptCodeField.props.readOnly).toBe(false);
    });

    // When the carrier independently requires an option (isRequired: true),
    // disabling the dependency source must NOT clear that field's readOnly
    // or change its value.
    // Regression: previously, turning off 18+ check would blindly set
    // readOnly = false on all dependents, overriding the carrier's isRequired lock.
    it('preserves readOnly and value on carrier-required fields when dependency source is disabled', () => {
      const {signatureField, onlyRecipientField, receiptCodeField, triggerAfterUpdate} =
        setupAgeVerificationScenario({
          // Signature is independently required by the carrier
          requiresSignature: {isRequired: true, isSelectedByDefault: false},
        });

      // First enable to lock all dependent fields…
      triggerAfterUpdate(TriState.On);

      // Verify signature was forced ON by the dependency.
      expect(signatureField.ref.value).toBe(TriState.On);
      expect(signatureField.props.readOnly).toBe(true);

      // …then disable — signature should stay locked and ON, others should unlock.
      triggerAfterUpdate(TriState.Off);

      // Signature must remain ON and readOnly because the carrier requires it,
      // regardless of the 18+ dependency being turned off.
      expect(signatureField.ref.value).toBe(TriState.On);
      expect(signatureField.props.readOnly).toBe(true);
      // Only-recipient is not independently required, so it should unlock.
      expect(onlyRecipientField.props.readOnly).toBe(false);
      // Receipt code is an excluded dep, also not independently required.
      expect(receiptCodeField.props.readOnly).toBe(false);
    });
  });
});
