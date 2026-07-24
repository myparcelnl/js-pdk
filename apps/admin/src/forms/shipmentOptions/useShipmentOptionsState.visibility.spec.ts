import {effectScope, nextTick, ref, toValue} from 'vue';
import {describe, expect, it, vi, beforeEach} from 'vitest';
import {defineForm, type FormInstance} from '@myparcel-dev/vue-form-builder';
import {type CarrierModel, TriState} from '@myparcel-dev/pdk-common';
import {useShipmentOptionsState} from './useShipmentOptionsState';
import {createShipmentOptionField} from './fields/createShipmentOptionField';
import {FIELD_CARRIER, optionFieldName} from './field';

/**
 * Integration spec for the path the unit spec cannot cover: the option states reaching the
 * REAL vue-form-builder elements. The form-builder evaluates every field hook once,
 * synchronously, while the fields are constructed inside `defineForm` — BEFORE
 * `useShipmentOptionsState` has registered the form. That first evaluation must still
 * subscribe to the (not yet registered) option states, or `isVisible` freezes on its initial
 * value and unsupported options render forever. This is exactly what happened live when the
 * registry was a WeakMap: a WeakMap read is not a reactive dependency.
 */

const getCarrierCapabilitiesForShipmentMock = vi.fn();

vi.mock('../helpers', () => ({
  // Mirrors the real triStateValueIsEnabled. Kept inline: awaiting an import inside this
  // factory deadlocks vitest through the helpers barrel's own import chain.
  triStateValueIsEnabled: (value: unknown, defaultValue: unknown) =>
    value === TriState.Inherit ? defaultValue === TriState.On : value === TriState.On,
  useFormCapabilities: () => ({
    getCarrierCapabilitiesForShipment: getCarrierCapabilitiesForShipmentMock,
  }),
  defineFormField: (config: unknown) => config,
  getFieldLabel: (name: string) => name,
  resolveFormComponent: () => 'div',
}));

vi.mock('../../stores', () => ({
  useQueryStore: () => ({
    has: () => false,
    get: () => ({status: ref('idle'), data: ref(undefined)}),
  }),
}));

vi.mock('../form-builder/utils/createValueSetter', () => ({
  setFieldRef: (field: {ref: {value: unknown}}, value: unknown) => {
    field.ref.value = value;
  },
}));

const OPTION_KEYS = ['requiresSignature', 'frozen'];

/**
 * Wait for the form-builder's hook effects: the recompute watcher runs on the pre queue
 * (first nextTick), and the form-builder writes each hook result into its element ref in a
 * promise callback after re-evaluating (second round).
 */
const flushHookEffects = async (): Promise<void> => {
  await nextTick();
  await nextTick();
  await Promise.resolve();
};

const isFieldVisible = (form: FormInstance, optionKey: string): boolean =>
  toValue((form.getField(optionFieldName(optionKey)) as unknown as {isVisible: unknown}).isVisible) as boolean;

describe('option visibility on real form elements', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('hides unsupported options even though hooks first run before the module registers', async () => {
    const availability = ref<CarrierModel['options']>({requiresSignature: {}});

    getCarrierCapabilitiesForShipmentMock.mockImplementation(() => ({options: availability.value}));

    const scope = effectScope();

    await scope.run(async () => {
      // Constructing the form evaluates every visibleWhen immediately — before registration.
      const form = defineForm('element-visibility', {
        fields: [
          {name: FIELD_CARRIER, component: 'div', ref: ref('CARRIER_A')},
          ...OPTION_KEYS.map((key) => createShipmentOptionField({}, optionFieldName(key))),
        ],
      }) as unknown as FormInstance;

      // Before registration every option falls back to the neutral state: visible.
      expect(isFieldVisible(form, 'frozen')).toBe(true);

      useShipmentOptionsState(form, OPTION_KEYS);
      await flushHookEffects();

      // After registration the carrier's availability reaches the elements: the supported
      // option stays visible, the unsupported one is hidden.
      expect(isFieldVisible(form, 'requiresSignature')).toBe(true);
      expect(isFieldVisible(form, 'frozen')).toBe(false);

      // Availability changes (e.g. another carrier's capabilities arriving) flow through
      // reactively to the same elements.
      availability.value = {requiresSignature: {}, frozen: {}};
      await flushHookEffects();

      expect(isFieldVisible(form, 'frozen')).toBe(true);
    });

    scope.stop();
  });
});
