import {effectScope, nextTick, ref, type Ref} from 'vue';
import {describe, expect, it, vi, beforeEach} from 'vitest';
import {BackendEndpoint, type CarrierModel, TriState} from '@myparcel-dev/pdk-common';
import {getOptionState, resolveOptionStates, useShipmentOptionsState} from './useShipmentOptionsState';
import {FIELD_CARRIER, optionFieldName} from './field';

type FakeQuery = {
  status: ReturnType<typeof ref<string>>;
  data: ReturnType<typeof ref<unknown>>;
};

const queries = new Map<string, FakeQuery>();

const queryStoreMock = {
  has: (endpoint: BackendEndpoint, modifier: string) => queries.has(`${endpoint}.${modifier}`),
  get: (endpoint: BackendEndpoint, modifier: string) =>
    queries.get(`${endpoint}.${modifier}`) ?? {status: ref('idle'), data: ref(undefined)},
};

const registerShipmentQuery = (orderId: string): FakeQuery => {
  const entry: FakeQuery = {status: ref('loading'), data: ref(undefined)};

  queries.set(`${BackendEndpoint.ProxyCapabilities}.${orderId}.shipment`, entry);

  return entry;
};

const getCarrierCapabilitiesForShipmentMock = vi.fn();

vi.mock('../../stores', () => ({
  useQueryStore: () => queryStoreMock,
}));

vi.mock('../helpers', () => ({
  // Mirrors the real triStateValueIsEnabled. Kept inline: awaiting an import inside this
  // factory deadlocks vitest through the helpers barrel's own import chain.
  triStateValueIsEnabled: (value: unknown, defaultValue: unknown) =>
    value === TriState.Inherit ? defaultValue === TriState.On : value === TriState.On,
  useFormCapabilities: () => ({
    getCarrierCapabilitiesForShipment: getCarrierCapabilitiesForShipmentMock,
  }),
}));

const setFieldRefMock = vi.fn();

// The extra arrow keeps the spy reference lazy: the mock factory runs while this module is
// still initializing (static imports), before `setFieldRefMock` above exists.
vi.mock('../form-builder/utils/createValueSetter', () => ({
  setFieldRef: (field: unknown, value: unknown) => setFieldRefMock(field, value),
}));

type FakeField = {name: string; ref: Ref<unknown>; props: {defaultValue?: TriState}};

const buildForm = (initial: Record<string, unknown>, defaults: Record<string, TriState> = {}) => {
  const fieldByName = new Map<string, FakeField>();

  Object.keys(initial).forEach((name) => {
    fieldByName.set(name, {name, ref: ref(initial[name]), props: {defaultValue: defaults[name]}});
  });

  return {
    state: new Proxy({} as Record<string, unknown>, {
      get: (_, name: string) => fieldByName.get(name)?.ref.value,
    }),
    getValue: <T>(name: string): T => fieldByName.get(name)?.ref.value as T,
    getField: (name: string) => {
      if (!fieldByName.has(name)) {
        fieldByName.set(name, {name, ref: ref(undefined), props: {}});
      }

      return fieldByName.get(name);
    },
    setExternally: (name: string, value: unknown) => {
      const field = fieldByName.get(name);

      if (field) {
        field.ref.value = value;
      } else {
        fieldByName.set(name, {name, ref: ref(value), props: {}});
      }
    },
  };
};

const wireSetFieldRef = (form: ReturnType<typeof buildForm>) => {
  setFieldRefMock.mockImplementation((field: {name: string}, value: unknown) => {
    form.setExternally(field.name, value);
  });
};

/** Real PostNL shape: 18+ requires signature + only recipient and excludes receipt code. */
const realOptions = (): CarrierModel['options'] =>
  ({
    requiresAgeVerification: {
      isRequired: false,
      isSelectedByDefault: false,
      requires: ['recipientOnlyDelivery', 'requiresSignature'],
      excludes: ['requiresReceiptCode'],
    },
    requiresSignature: {isRequired: false, isSelectedByDefault: false},
    recipientOnlyDelivery: {isRequired: false, isSelectedByDefault: false},
    requiresReceiptCode: {isRequired: false, isSelectedByDefault: false},
  } as CarrierModel['options']);

const ALL_KEYS = ['requiresAgeVerification', 'requiresSignature', 'recipientOnlyDelivery', 'requiresReceiptCode'];

/**
 * Verbatim option rules from a real POSTNL proxyCapabilities response. Receipt code requires
 * insurance while excluding signature and only recipient, and insurance requires those same two
 * options — the data asks for and rules out the same pair. Signature and only recipient exclude
 * receipt code in return.
 */
const receiptCodeOptions = (): CarrierModel['options'] =>
  ({
    insurance: {
      isRequired: false,
      isSelectedByDefault: false,
      requires: ['requiresSignature', 'recipientOnlyDelivery'],
      excludes: ['printReturnLabelAtDropOff'],
    },
    recipientOnlyDelivery: {
      isRequired: false,
      isSelectedByDefault: false,
      requires: [],
      excludes: ['printReturnLabelAtDropOff', 'requiresReceiptCode'],
    },
    requiresReceiptCode: {
      isRequired: false,
      isSelectedByDefault: false,
      requires: ['insurance'],
      excludes: [
        'requiresAgeVerification',
        'recipientOnlyDelivery',
        'printReturnLabelAtDropOff',
        'returnOnFirstFailedDelivery',
        'requiresSignature',
      ],
    },
    requiresSignature: {
      isRequired: false,
      isSelectedByDefault: false,
      requires: [],
      excludes: ['printReturnLabelAtDropOff', 'requiresReceiptCode'],
    },
  } as CarrierModel['options']);

const RECEIPT_CODE_KEYS = ['requiresReceiptCode', 'requiresSignature', 'recipientOnlyDelivery', 'insurance'];

const buildCarrier = (overrides: Partial<CarrierModel>): CarrierModel =>
  ({
    carrier: 'POSTNL',
    packageTypes: [],
    deliveryTypes: [],
    options: {},
    ...overrides,
  } as CarrierModel);

beforeEach(() => {
  queries.clear();
  getCarrierCapabilitiesForShipmentMock.mockReset();
  setFieldRefMock.mockReset();
});

describe('resolveOptionStates (pure)', () => {
  const entry = (key: string, value?: TriState, defaultValue?: TriState) => ({key, value, defaultValue});

  it('forces the requires closure of an enabled option on and locks it', () => {
    const states = resolveOptionStates({
      availabilityOptions: realOptions(),
      shipmentOptions: realOptions(),
      entries: [
        entry('requiresAgeVerification', TriState.On),
        entry('requiresSignature', TriState.Inherit),
        entry('recipientOnlyDelivery', TriState.Off),
        entry('requiresReceiptCode', TriState.Inherit),
      ],
    });

    expect(states.get('requiresSignature')).toMatchObject({forcedOn: true, readOnly: true});
    expect(states.get('recipientOnlyDelivery')).toMatchObject({
      forcedOn: true,
      readOnly: true,
    });
    expect(states.get('requiresReceiptCode')).toMatchObject({
      forcedOff: true,
      readOnly: true,
    });
    // The source option itself is not forced; its own value is user intent.
    expect(states.get('requiresAgeVerification')).toMatchObject({forcedOn: false, readOnly: false});
  });

  it('treats inherit with an inherited default of on as enabled', () => {
    const states = resolveOptionStates({
      availabilityOptions: realOptions(),
      shipmentOptions: realOptions(),
      entries: [
        entry('requiresAgeVerification', TriState.Inherit, TriState.On),
        entry('requiresSignature', TriState.Inherit),
        entry('recipientOnlyDelivery', TriState.Inherit),
        entry('requiresReceiptCode', TriState.Inherit),
      ],
    });

    expect(states.get('requiresSignature')).toMatchObject({forcedOn: true});
    expect(states.get('recipientOnlyDelivery')).toMatchObject({forcedOn: true});
  });

  it('seeds carrier-required options into the forced set including their requires', () => {
    const options = {
      requiresSignature: {isRequired: true, requires: ['recipientOnlyDelivery']},
      recipientOnlyDelivery: {isRequired: false},
    } as unknown as CarrierModel['options'];

    const states = resolveOptionStates({
      availabilityOptions: options,
      shipmentOptions: options,
      entries: [entry('requiresSignature', TriState.Inherit), entry('recipientOnlyDelivery', TriState.Inherit)],
    });

    expect(states.get('requiresSignature')).toMatchObject({forcedOn: true, readOnly: true});
    expect(states.get('recipientOnlyDelivery')).toMatchObject({forcedOn: true});
  });

  it('resolves transitive requires chains', () => {
    const options = {
      optionA: {requires: ['optionB']},
      optionB: {requires: ['optionC']},
      optionC: {},
    } as unknown as CarrierModel['options'];

    const states = resolveOptionStates({
      availabilityOptions: options,
      shipmentOptions: options,
      entries: [entry('optionA', TriState.On), entry('optionB', TriState.Inherit), entry('optionC', TriState.Inherit)],
    });

    expect(states.get('optionB')).toMatchObject({forcedOn: true});
    expect(states.get('optionC')).toMatchObject({forcedOn: true});
  });

  it('terminates on circular requires', () => {
    const options = {
      optionA: {requires: ['optionB']},
      optionB: {requires: ['optionA']},
    } as unknown as CarrierModel['options'];

    const states = resolveOptionStates({
      availabilityOptions: options,
      shipmentOptions: options,
      entries: [entry('optionA', TriState.On), entry('optionB', TriState.Inherit)],
    });

    expect(states.get('optionB')).toMatchObject({forcedOn: true});
  });

  it.each([
    [['optionA', 'optionB'], {forcedOn: true, forcedOff: false}],
    [['optionB', 'optionA'], {forcedOn: false, forcedOff: true}],
  ])('applies whichever rule comes first when two enabled options disagree, read as %j', (order, expected) => {
    // Option A requires option C, and option B excludes option C. The two kinds of rule have equal
    // rank. The option that the resolver reads first has effect, and it reports the other rule.
    const options = {
      optionA: {requires: ['optionC']},
      optionB: {excludes: ['optionC']},
      optionC: {},
    } as unknown as CarrierModel['options'];

    const states = resolveOptionStates({
      availabilityOptions: options,
      shipmentOptions: options,
      entries: [...order.map((key) => entry(key, TriState.On)), entry('optionC', TriState.Inherit)],
    });

    expect(states.get('optionC')).toMatchObject(expected);
    expect(states.get('optionC')?.readOnly).toBe(true);
  });

  it('forces off what an enabled option excludes, even when a requires chain asks for them', () => {
    const states = resolveOptionStates({
      availabilityOptions: receiptCodeOptions(),
      shipmentOptions: receiptCodeOptions(),
      entries: [
        entry('requiresReceiptCode', TriState.Inherit, TriState.On),
        entry('requiresSignature', TriState.Off),
        entry('recipientOnlyDelivery', TriState.Off),
        entry('insurance', TriState.Off),
      ],
    });

    // Receipt code excludes the two options. The requires chain through insurance must not set
    // them to on.
    expect(states.get('requiresSignature')).toMatchObject({forcedOn: false, forcedOff: true, readOnly: true});
    expect(states.get('recipientOnlyDelivery')).toMatchObject({forcedOn: false, forcedOff: true, readOnly: true});

    // What receipt code does require is still forced on.
    expect(states.get('insurance')).toMatchObject({forcedOn: true});

    // The merchant's own option keeps its value and stays editable.
    expect(states.get('requiresReceiptCode')).toMatchObject({forcedOn: false, forcedOff: false, readOnly: false});
  });

  it('settles immediately: applying the forced values produces the same states again', () => {
    const entries = [
      entry('requiresReceiptCode', TriState.Inherit, TriState.On),
      entry('requiresSignature', TriState.Off),
      entry('recipientOnlyDelivery', TriState.Off),
      entry('insurance', TriState.Off),
    ];

    const forcedFlags = (states: Map<string, {forcedOn: boolean; forcedOff: boolean}>) =>
      [...states].map(([key, state]) => [key, state.forcedOn, state.forcedOff]);

    const resolve = () =>
      resolveOptionStates({
        availabilityOptions: receiptCodeOptions(),
        shipmentOptions: receiptCodeOptions(),
        entries,
      });

    const first = resolve();

    // Do the same as applyForcedValues. Write each forced value, but do not change an option that
    // is not a toggle.
    entries.forEach((current) => {
      const state = first.get(current.key);

      if (current.key === 'insurance' || !state || (!state.forcedOn && !state.forcedOff)) {
        return;
      }

      current.value = state.forcedOn ? TriState.On : TriState.Off;
    });

    // A write to insurance makes insurance an enabled option. Its requires rules then set the
    // options that receipt code excludes, and the next pass locks receipt code to off.
    expect(forcedFlags(resolve())).toEqual(forcedFlags(first));
  });

  it('drops every conflicting option when an order was stored with a combination the rules forbid', () => {
    // An order from an earlier version can hold all three options at the same time. No rule can
    // satisfy this data, and thus the resolver sets the three options to off.
    const states = resolveOptionStates({
      availabilityOptions: receiptCodeOptions(),
      shipmentOptions: receiptCodeOptions(),
      entries: [
        entry('requiresReceiptCode', TriState.On),
        entry('requiresSignature', TriState.On),
        entry('recipientOnlyDelivery', TriState.On),
        entry('insurance', TriState.Off),
      ],
    });

    expect(states.get('requiresSignature')).toMatchObject({forcedOff: true});
    expect(states.get('recipientOnlyDelivery')).toMatchObject({forcedOff: true});
    expect(states.get('requiresReceiptCode')).toMatchObject({forcedOff: true});
  });

  it('marks options missing from availability data as unsupported and hidden', () => {
    const options = {requiresSignature: {}} as unknown as CarrierModel['options'];

    const states = resolveOptionStates({
      availabilityOptions: options,
      shipmentOptions: options,
      entries: [entry('requiresSignature', TriState.Inherit), entry('hideSender', TriState.Inherit)],
    });

    expect(states.get('requiresSignature')).toMatchObject({supported: true});
    expect(states.get('hideSender')).toMatchObject({supported: false});
  });

  it('produces no locks and no coercions without rule data', () => {
    const states = resolveOptionStates({
      availabilityOptions: realOptions(),
      shipmentOptions: undefined,
      entries: [entry('requiresAgeVerification', TriState.On), entry('requiresSignature', TriState.Off)],
    });

    expect(states.get('requiresSignature')).toMatchObject({forcedOn: false, forcedOff: false, readOnly: false});
  });

  it('marks everything unsupported without availability data', () => {
    const states = resolveOptionStates({
      availabilityOptions: undefined,
      shipmentOptions: undefined,
      entries: [entry('requiresSignature', TriState.Inherit)],
    });

    expect(states.get('requiresSignature')).toMatchObject({supported: false});
  });
});

describe('useShipmentOptionsState (reactive)', () => {
  const setup = (
    initialValues: Record<string, unknown>,
    defaults: Record<string, TriState> = {},
    selectionCarrier = 'POSTNL',
    keys: string[] = ALL_KEYS,
  ) => {
    const form = buildForm({[FIELD_CARRIER]: 'POSTNL', ...initialValues}, defaults);

    wireSetFieldRef(form);

    const shipmentEntry = registerShipmentQuery('order-1');
    const selection = ref({carrier: selectionCarrier, packageType: 'PACKAGE', deliveryType: 'STANDARD'}) as Ref<{
      carrier?: string;
      packageType?: string;
      deliveryType?: string;
    }>;

    const scope = effectScope();
    scope.run(() => {
      useShipmentOptionsState(form as never, keys, {orderId: 'order-1', selection});
    });

    return {form, shipmentEntry, selection, scope, getOptionState};
  };

  const resolveShipment = (shipmentEntry: FakeQuery, options: CarrierModel['options']) => {
    shipmentEntry.status.value = 'success';
    shipmentEntry.data.value = [buildCarrier({carrier: 'POSTNL', options})];
  };

  it('turns dependent options on and locks them when the form opens with the source already on', async () => {
    const {form, shipmentEntry, scope, getOptionState} = setup({
      [optionFieldName('requiresAgeVerification')]: TriState.On,
      [optionFieldName('requiresSignature')]: TriState.Inherit,
      [optionFieldName('recipientOnlyDelivery')]: TriState.Off,
      [optionFieldName('requiresReceiptCode')]: TriState.Inherit,
    });

    resolveShipment(shipmentEntry, realOptions());
    await nextTick();

    expect(form.state[optionFieldName('requiresSignature')]).toBe(TriState.On);
    expect(form.state[optionFieldName('recipientOnlyDelivery')]).toBe(TriState.On);
    expect(form.state[optionFieldName('requiresReceiptCode')]).toBe(TriState.Off);
    expect(getOptionState(form as never, 'requiresSignature').readOnly).toBe(true);
    expect(getOptionState(form as never, 'recipientOnlyDelivery').readOnly).toBe(true);
    expect(getOptionState(form as never, 'requiresReceiptCode').readOnly).toBe(true);
    expect(getOptionState(form as never, 'requiresAgeVerification').readOnly).toBe(false);

    scope.stop();
  });

  it('keeps the amount of a required option that holds a range', async () => {
    const insuranceField = optionFieldName('insurance');

    const {form, shipmentEntry, scope} = setup(
      {
        [optionFieldName('requiresReceiptCode')]: TriState.Inherit,
        [optionFieldName('requiresSignature')]: TriState.Off,
        [optionFieldName('recipientOnlyDelivery')]: TriState.Off,
        // An amount in cents, not a tri-state.
        [insuranceField]: 25_000,
      },
      {[optionFieldName('requiresReceiptCode')]: TriState.On},
      'POSTNL',
      RECEIPT_CODE_KEYS,
    );

    resolveShipment(shipmentEntry, receiptCodeOptions());
    await nextTick();

    // Receipt code requires insurance. A requires rule gives a range of amounts, and thus the
    // field keeps its amount. Export applies the rule again.
    expect(form.state[insuranceField]).toBe(25_000);
    expect(setFieldRefMock).not.toHaveBeenCalledWith(
      expect.objectContaining({name: insuranceField}),
      expect.anything(),
    );

    // Receipt code stays on, and the two options it excludes are off and locked.
    expect(form.state[optionFieldName('requiresSignature')]).toBe(TriState.Off);
    expect(form.state[optionFieldName('recipientOnlyDelivery')]).toBe(TriState.Off);
    expect(form.state[optionFieldName('requiresReceiptCode')]).toBe(TriState.Inherit);
    expect(getOptionState(form as never, 'requiresReceiptCode').readOnly).toBe(false);

    scope.stop();
  });

  it('clears the amount of an excluded option that holds a range', async () => {
    const insuranceField = optionFieldName('insurance');

    const options = {
      requiresSignature: {isRequired: false, requires: [], excludes: ['insurance']},
      insurance: {isRequired: false, requires: ['recipientOnlyDelivery'], excludes: []},
      recipientOnlyDelivery: {isRequired: false, requires: [], excludes: []},
    } as unknown as CarrierModel['options'];

    const {form, shipmentEntry, scope} = setup(
      {
        [optionFieldName('requiresSignature')]: TriState.On,
        [optionFieldName('recipientOnlyDelivery')]: TriState.Off,
        [insuranceField]: 25_000,
      },
      {},
      'POSTNL',
      ['requiresSignature', 'recipientOnlyDelivery', 'insurance'],
    );

    resolveShipment(shipmentEntry, options);
    await nextTick();

    // An excludes rule gives one value. The resolver clears the old amount and does not lock the
    // field on that amount.
    expect(form.state[insuranceField]).toBe(TriState.Off);

    // An amount of off is not an enabled option. Insurance therefore cannot set only recipient
    // to on.
    expect(form.state[optionFieldName('recipientOnlyDelivery')]).toBe(TriState.Off);
    expect(getOptionState(form as never, 'recipientOnlyDelivery').forcedOn).toBe(false);

    scope.stop();
  });

  it('turns dependent options on and locks them when the source is on through its inherited default', async () => {
    const {form, shipmentEntry, scope, getOptionState} = setup(
      {
        [optionFieldName('requiresAgeVerification')]: TriState.Inherit,
        [optionFieldName('requiresSignature')]: TriState.Inherit,
        [optionFieldName('recipientOnlyDelivery')]: TriState.Inherit,
        [optionFieldName('requiresReceiptCode')]: TriState.Inherit,
      },
      {[optionFieldName('requiresAgeVerification')]: TriState.On},
    );

    resolveShipment(shipmentEntry, realOptions());
    await nextTick();

    expect(form.state[optionFieldName('requiresSignature')]).toBe(TriState.On);
    expect(getOptionState(form as never, 'requiresSignature').readOnly).toBe(true);

    scope.stop();
  });

  it('unlocks dependents without reverting their values when the source turns off', async () => {
    const {form, shipmentEntry, scope, getOptionState} = setup({
      [optionFieldName('requiresAgeVerification')]: TriState.On,
      [optionFieldName('requiresSignature')]: TriState.Inherit,
      [optionFieldName('recipientOnlyDelivery')]: TriState.Inherit,
      [optionFieldName('requiresReceiptCode')]: TriState.Inherit,
    });

    resolveShipment(shipmentEntry, realOptions());
    await nextTick();
    expect(form.state[optionFieldName('requiresSignature')]).toBe(TriState.On);

    form.setExternally(optionFieldName('requiresAgeVerification'), TriState.Off);
    await nextTick();

    expect(getOptionState(form as never, 'requiresSignature').readOnly).toBe(false);
    expect(form.state[optionFieldName('requiresSignature')]).toBe(TriState.On);

    scope.stop();
  });

  it('keeps carrier-required options locked when the dependency source turns off', async () => {
    const options = realOptions();

    (options as Record<string, {isRequired?: boolean}>).requiresSignature.isRequired = true;

    const {form, shipmentEntry, scope, getOptionState} = setup({
      [optionFieldName('requiresAgeVerification')]: TriState.On,
      [optionFieldName('requiresSignature')]: TriState.Inherit,
      [optionFieldName('recipientOnlyDelivery')]: TriState.Inherit,
      [optionFieldName('requiresReceiptCode')]: TriState.Inherit,
    });

    resolveShipment(shipmentEntry, options);
    await nextTick();

    form.setExternally(optionFieldName('requiresAgeVerification'), TriState.Off);
    await nextTick();

    expect(getOptionState(form as never, 'requiresSignature').readOnly).toBe(true);
    expect(form.state[optionFieldName('requiresSignature')]).toBe(TriState.On);
    expect(getOptionState(form as never, 'recipientOnlyDelivery').readOnly).toBe(false);

    scope.stop();
  });

  it('applies no locks and writes nothing while the shipment query is loading', async () => {
    const {scope, getOptionState, form} = setup({
      [optionFieldName('requiresAgeVerification')]: TriState.On,
      [optionFieldName('requiresSignature')]: TriState.Inherit,
    });

    await nextTick();

    expect(getOptionState(form as never, 'requiresSignature').readOnly).toBe(false);
    expect(setFieldRefMock).not.toHaveBeenCalled();

    scope.stop();
  });

  it('keeps existing locks while the same carrier is being refetched', async () => {
    const {form, shipmentEntry, scope, getOptionState} = setup({
      [optionFieldName('requiresAgeVerification')]: TriState.On,
      [optionFieldName('requiresSignature')]: TriState.Inherit,
      [optionFieldName('recipientOnlyDelivery')]: TriState.Inherit,
      [optionFieldName('requiresReceiptCode')]: TriState.Inherit,
    });

    resolveShipment(shipmentEntry, realOptions());
    await nextTick();
    expect(getOptionState(form as never, 'requiresSignature').readOnly).toBe(true);

    // Weight change: query refetches for the same carrier.
    shipmentEntry.status.value = 'loading';
    await nextTick();

    expect(getOptionState(form as never, 'requiresSignature').readOnly).toBe(true);

    scope.stop();
  });

  it('drops locks when the form carrier no longer matches the fetched selection', async () => {
    const {form, shipmentEntry, scope, getOptionState} = setup({
      [optionFieldName('requiresAgeVerification')]: TriState.On,
      [optionFieldName('requiresSignature')]: TriState.Inherit,
      [optionFieldName('recipientOnlyDelivery')]: TriState.Inherit,
      [optionFieldName('requiresReceiptCode')]: TriState.Inherit,
    });

    resolveShipment(shipmentEntry, realOptions());
    await nextTick();
    expect(getOptionState(form as never, 'requiresSignature').readOnly).toBe(true);

    // Carrier switch: form updates instantly, debounced selection still points at POSTNL.
    form.setExternally(FIELD_CARRIER, 'DPD');
    await nextTick();

    expect(getOptionState(form as never, 'requiresSignature').readOnly).toBe(false);

    scope.stop();
  });

  it('turns a forced option back on when something else switches it off', async () => {
    const {form, shipmentEntry, scope} = setup({
      [optionFieldName('requiresAgeVerification')]: TriState.On,
      [optionFieldName('requiresSignature')]: TriState.Inherit,
      [optionFieldName('recipientOnlyDelivery')]: TriState.Inherit,
      [optionFieldName('requiresReceiptCode')]: TriState.Inherit,
    });

    resolveShipment(shipmentEntry, realOptions());
    await nextTick();
    expect(form.state[optionFieldName('requiresSignature')]).toBe(TriState.On);

    form.setExternally(optionFieldName('requiresSignature'), TriState.Off);
    await nextTick();

    expect(form.state[optionFieldName('requiresSignature')]).toBe(TriState.On);

    scope.stop();
  });
});
