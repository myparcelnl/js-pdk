import {effectScope, nextTick, ref, type Ref} from 'vue';
import {describe, expect, it, vi, beforeEach} from 'vitest';
import {BackendEndpoint, type CarrierModel, TriState} from '@myparcel-dev/pdk-common';
import {FIELD_CARRIER, FIELD_SHIPMENT_OPTIONS_PREFIX} from './field';

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
  useFormCapabilities: () => ({
    getCarrierCapabilitiesForShipment: getCarrierCapabilitiesForShipmentMock,
  }),
}));

const setFieldRefMock = vi.fn();

vi.mock('../form-builder/utils/createValueSetter', () => ({
  setFieldRef: setFieldRefMock,
}));

const optionFieldName = (key: string): string => `${FIELD_SHIPMENT_OPTIONS_PREFIX}.${key}`;

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

  it('forces the requires closure of an enabled option on and locks it', async () => {
    const {resolveOptionStates} = await import('./useShipmentOptionsState');

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

    expect(states.get('requiresSignature')).toMatchObject({forcedOn: true, readOnly: true, targetValue: TriState.On});
    expect(states.get('recipientOnlyDelivery')).toMatchObject({
      forcedOn: true,
      readOnly: true,
      targetValue: TriState.On,
    });
    expect(states.get('requiresReceiptCode')).toMatchObject({
      forcedOff: true,
      readOnly: true,
      targetValue: TriState.Off,
    });
    // The source option itself is not forced; its own value is user intent.
    expect(states.get('requiresAgeVerification')).toMatchObject({forcedOn: false, readOnly: false});
  });

  it('treats inherit with an inherited default of on as enabled', async () => {
    const {resolveOptionStates} = await import('./useShipmentOptionsState');

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

    expect(states.get('requiresSignature')).toMatchObject({forcedOn: true, targetValue: TriState.On});
    expect(states.get('recipientOnlyDelivery')).toMatchObject({forcedOn: true, targetValue: TriState.On});
  });

  it('seeds carrier-required options into the forced set including their requires', async () => {
    const {resolveOptionStates} = await import('./useShipmentOptionsState');

    const options = {
      requiresSignature: {isRequired: true, requires: ['recipientOnlyDelivery']},
      recipientOnlyDelivery: {isRequired: false},
    } as unknown as CarrierModel['options'];

    const states = resolveOptionStates({
      availabilityOptions: options,
      shipmentOptions: options,
      entries: [entry('requiresSignature', TriState.Inherit), entry('recipientOnlyDelivery', TriState.Inherit)],
    });

    expect(states.get('requiresSignature')).toMatchObject({forcedOn: true, readOnly: true, targetValue: TriState.On});
    expect(states.get('recipientOnlyDelivery')).toMatchObject({forcedOn: true, targetValue: TriState.On});
  });

  it('resolves transitive requires chains', async () => {
    const {resolveOptionStates} = await import('./useShipmentOptionsState');

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

  it('terminates on circular requires', async () => {
    const {resolveOptionStates} = await import('./useShipmentOptionsState');

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

  it('lets forced-off win over forced-on', async () => {
    const {resolveOptionStates} = await import('./useShipmentOptionsState');

    const options = {
      optionA: {requires: ['optionC']},
      optionB: {excludes: ['optionC']},
      optionC: {},
    } as unknown as CarrierModel['options'];

    const states = resolveOptionStates({
      availabilityOptions: options,
      shipmentOptions: options,
      entries: [entry('optionA', TriState.On), entry('optionB', TriState.On), entry('optionC', TriState.Inherit)],
    });

    expect(states.get('optionC')).toMatchObject({forcedOn: false, forcedOff: true, targetValue: TriState.Off});
  });

  it('marks options missing from availability data as unsupported and hidden', async () => {
    const {resolveOptionStates} = await import('./useShipmentOptionsState');

    const options = {requiresSignature: {}} as unknown as CarrierModel['options'];

    const states = resolveOptionStates({
      availabilityOptions: options,
      shipmentOptions: options,
      entries: [entry('requiresSignature', TriState.Inherit), entry('hideSender', TriState.Inherit)],
    });

    expect(states.get('requiresSignature')).toMatchObject({supported: true, visible: true});
    expect(states.get('hideSender')).toMatchObject({supported: false, visible: false});
  });

  it('produces no locks and no coercions without rule data', async () => {
    const {resolveOptionStates} = await import('./useShipmentOptionsState');

    const states = resolveOptionStates({
      availabilityOptions: realOptions(),
      shipmentOptions: undefined,
      entries: [entry('requiresAgeVerification', TriState.On), entry('requiresSignature', TriState.Off)],
    });

    expect(states.get('requiresSignature')).toMatchObject({forcedOn: false, forcedOff: false, readOnly: false});
    expect(states.get('requiresSignature')?.targetValue).toBeUndefined();
  });

  it('marks everything unsupported without availability data', async () => {
    const {resolveOptionStates} = await import('./useShipmentOptionsState');

    const states = resolveOptionStates({
      availabilityOptions: undefined,
      shipmentOptions: undefined,
      entries: [entry('requiresSignature', TriState.Inherit)],
    });

    expect(states.get('requiresSignature')).toMatchObject({supported: false, visible: false});
  });
});

describe('useShipmentOptionsState (reactive)', () => {
  const setup = async (
    initialValues: Record<string, unknown>,
    defaults: Record<string, TriState> = {},
    selectionCarrier = 'POSTNL',
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
    const {useShipmentOptionsState, getOptionState} = await import('./useShipmentOptionsState');

    scope.run(() => {
      useShipmentOptionsState(form as never, ALL_KEYS, {orderId: 'order-1', selection});
    });

    return {form, shipmentEntry, selection, scope, getOptionState};
  };

  const resolveShipment = (shipmentEntry: FakeQuery, options: CarrierModel['options']) => {
    shipmentEntry.status.value = 'success';
    shipmentEntry.data.value = [buildCarrier({carrier: 'POSTNL', options})];
  };

  it('turns dependent options on and locks them when the form opens with the source already on', async () => {
    const {form, shipmentEntry, scope, getOptionState} = await setup({
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

  it('turns dependent options on and locks them when the source is on through its inherited default', async () => {
    const {form, shipmentEntry, scope, getOptionState} = await setup(
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
    const {form, shipmentEntry, scope, getOptionState} = await setup({
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

    const {form, shipmentEntry, scope, getOptionState} = await setup({
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
    const {scope, getOptionState, form} = await setup({
      [optionFieldName('requiresAgeVerification')]: TriState.On,
      [optionFieldName('requiresSignature')]: TriState.Inherit,
    });

    await nextTick();

    expect(getOptionState(form as never, 'requiresSignature').readOnly).toBe(false);
    expect(setFieldRefMock).not.toHaveBeenCalled();

    scope.stop();
  });

  it('keeps existing locks while the same carrier is being refetched', async () => {
    const {form, shipmentEntry, scope, getOptionState} = await setup({
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
    const {form, shipmentEntry, scope, getOptionState} = await setup({
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
    const {form, shipmentEntry, scope} = await setup({
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
