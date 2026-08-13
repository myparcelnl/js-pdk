import {describe, expect, it, vi} from 'vitest';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {type OptionState} from '../useShipmentOptionsState';
import {createInsuranceField} from './createInsuranceField';

/** Mutable option state — tests set this to control what the option-state module resolves. */
let mockState: OptionState;

vi.mock('../useShipmentOptionsState', () => ({
  getOptionState: () => mockState,
}));

// Full mock (no importOriginal) to avoid the Vue file import chain
// that triggers "Install @vitejs/plugin-vue" errors.
vi.mock('../../helpers', () => ({
  resolveFormComponent: () => 'MockSelectInput',
  defineFormField: (config: Record<string, unknown>) => config,
  getFieldLabel: (name: string) => name,
  setFieldProp: vi.fn(),
  useFormCapabilities: () => ({
    getCarrierCapabilitiesForShipment: () => undefined,
    getInsuranceOptions: () => [],
  }),
}));

vi.mock('../../../composables', () => ({
  useLocalizedFormatter: () => ({}),
}));

const state = (overrides: Partial<OptionState>): OptionState => ({
  supported: true,
  readOnly: false,
  forcedOn: false,
  forcedOff: false,
  ...overrides,
});

const form = {} as FormInstance;

describe('createInsuranceField', () => {
  const fieldName = 'deliveryOptions.shipmentOptions.insurance';

  const isReadOnly = (optionState: OptionState): boolean => {
    mockState = optionState;

    const field = createInsuranceField({[fieldName]: undefined}, fieldName);

    return (field.readOnlyWhen as (context: {form: FormInstance}) => boolean)({form});
  };

  it('locks the amount when the option is excluded', () => {
    // A rule that excludes the option gives one valid amount. The user has no other choice.
    expect(isReadOnly(state({forcedOff: true, readOnly: true}))).toBe(true);
  });

  it('keeps the amount editable when the option is required', () => {
    // A rule that requires the option gives a range of amounts. The user must set one of them.
    expect(isReadOnly(state({forcedOn: true, readOnly: true}))).toBe(false);
  });

  it('keeps the amount editable when no rule applies', () => {
    expect(isReadOnly(state({}))).toBe(false);
  });
});
