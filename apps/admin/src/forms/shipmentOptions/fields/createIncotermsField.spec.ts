import {nextTick, ref} from 'vue';
import {describe, expect, it, vi} from 'vitest';
import {TriState} from '@myparcel-dev/pdk-common';
import {type SelectOption} from '../../../types';
import {createIncotermsField} from './createIncotermsField';

/** Options the mocked capabilities return; tests replace the value to simulate a capabilities refetch. */
const mockOptions = ref<SelectOption[]>([]);

// Full mock (no importOriginal) to avoid the Vue file import chain.
vi.mock('../../helpers', () => ({
  resolveFormComponent: () => 'MockSelectInput',
  defineFormField: (config: Record<string, unknown>) => config,
  getFieldLabel: (name: string) => name,
  setFieldProp: (field: {props: Record<string, unknown>}, key: string, value: unknown) => {
    field.props[key] = value;
  },
  useFormCapabilities: () => ({
    getIncotermsOptions: () => mockOptions.value,
  }),
}));

const FIELD_NAME = 'deliveryOptions.shipmentOptions.incoterms';

const ruleOptions = (...rules: string[]): SelectOption[] => rules.map((rule) => ({plainLabel: rule, value: rule}));

const severalRules = (...rules: string[]): SelectOption[] => [
  {label: 'option_default', value: TriState.Inherit},
  ...ruleOptions(...rules),
];

/** Create the field for an order value and mount it on a minimal field instance. */
const mountField = (orderValue: unknown, options: SelectOption[]) => {
  mockOptions.value = options;

  const config = createIncotermsField({[FIELD_NAME]: orderValue}) as Record<string, any>;
  const field = {name: FIELD_NAME, ref: config.ref, form: {}, props: {}};

  config.onBeforeMount(field);

  return {config, field};
};

describe('createIncotermsField', () => {
  it('hides and disables the field when the shipment has no incoterms', () => {
    const {config} = mountField(TriState.Inherit, []);

    expect(config.visibleWhen({form: {}})).toBe(false);
    expect(config.disabledWhen({form: {}})).toBe(true);
  });

  it('shows the field with the capabilities options', () => {
    const {config, field} = mountField(TriState.Inherit, severalRules('DAP', 'DDP'));

    expect(config.visibleWhen({form: {}})).toBe(true);
    expect(config.disabledWhen({form: {}})).toBe(false);
    expect(field.props.options).toEqual(severalRules('DAP', 'DDP'));
  });

  it('keeps an order without a chosen rule on the default entry', () => {
    const {field} = mountField(TriState.Inherit, severalRules('DAP', 'DDP'));

    expect(field.ref.value).toBe(TriState.Inherit);
  });

  it('keeps a chosen rule that the capabilities allow', () => {
    const {field} = mountField('DDP', severalRules('DAP', 'DDP'));

    expect(field.ref.value).toBe('DDP');
  });

  it('sets the only rule when the capabilities allow one rule', () => {
    const {field} = mountField(TriState.Inherit, ruleOptions('DAP'));

    expect(field.props.options).toEqual(ruleOptions('DAP'));
    expect(field.ref.value).toBe('DAP');
  });

  it('updates the options after a refetch and leaves the value to the auto-clear', async () => {
    const {field} = mountField('DDP', severalRules('DAP', 'DDP'));

    mockOptions.value = severalRules('DAP', 'DDP_VAT_UNPAID');
    await nextTick();

    expect(field.props.options).toEqual(severalRules('DAP', 'DDP_VAT_UNPAID'));
    expect(field.ref.value).toBe('DDP');
  });
});
