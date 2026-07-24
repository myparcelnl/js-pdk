import {describe, expect, it, vi} from 'vitest';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {type OptionState} from '../useShipmentOptionsState';
import {createShipmentOptionField} from './createShipmentOptionField';

/**
 * Mutable option state — tests set this to control what the option-state module resolves for
 * the field, without needing per-test mock overrides. The factory's hooks must be pure
 * lookups on this state; all decision logic is covered by useShipmentOptionsState.spec.ts.
 */
let mockState: OptionState;

vi.mock('../useShipmentOptionsState', () => ({
  getOptionState: () => mockState,
}));

// Full mock (no importOriginal) to avoid the Vue file import chain
// that triggers "Install @vitejs/plugin-vue" errors.
vi.mock('../../helpers', () => ({
  resolveFormComponent: () => 'MockTriStateInput',
  defineFormField: (config: Record<string, unknown>) => config,
  getFieldLabel: (name: string) => name,
}));

const state = (overrides: Partial<OptionState>): OptionState => ({
  supported: true,
  readOnly: false,
  forcedOn: false,
  forcedOff: false,
  ...overrides,
});

const form = {} as FormInstance;

describe('createShipmentOptionField', () => {
  const fieldName = 'deliveryOptions.shipmentOptions.requiresSignature';

  const createField = () => createShipmentOptionField({[fieldName]: undefined}, fieldName);

  it('creates a field with the given name', () => {
    mockState = state({});

    expect(createField().name).toBe(fieldName);
  });

  it('is visible and enabled when the option is supported', () => {
    mockState = state({supported: true});
    const field = createField();

    expect(field.visibleWhen!.call(field, {form} as never)).toBe(true);
    expect(field.disabledWhen!.call(field, {form} as never)).toBe(false);
  });

  it('is hidden and disabled when the option is not supported', () => {
    mockState = state({supported: false});
    const field = createField();

    expect(field.visibleWhen!.call(field, {form} as never)).toBe(false);
    expect(field.disabledWhen!.call(field, {form} as never)).toBe(true);
  });

  it('is read-only when the state says so', () => {
    mockState = state({forcedOn: true, readOnly: true});
    const field = createField();

    expect(field.readOnlyWhen!.call(field, {form} as never)).toBe(true);
  });

  it('is editable when nothing forces the option', () => {
    mockState = state({});
    const field = createField();

    expect(field.readOnlyWhen!.call(field, {form} as never)).toBe(false);
  });

  it('defines no afterUpdate hook — enforcement lives in the option-state module', () => {
    mockState = state({});

    expect(createField().afterUpdate).toBeUndefined();
  });
});
