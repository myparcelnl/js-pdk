import {describe, expect, it, vi, beforeEach} from 'vitest';
import {effectScope, nextTick, ref, type Ref} from 'vue';
import {BackendEndpoint, type CarrierModel, TriState} from '@myparcel-dev/pdk-common';
import {FIELD_CARRIER, FIELD_DELIVERY_TYPE, FIELD_PACKAGE_TYPE, FIELD_SHIPMENT_OPTIONS_PREFIX} from './field';

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

/**
 * Create the shipment-query entry up front (in `loading` state) so the auto-clear's watcher
 * sees a registered query at setup; subsequent state transitions mutate the same refs and
 * are reactively visible to the watcher.
 */
const registerShipmentQuery = (orderId: string): FakeQuery => {
  const entry: FakeQuery = {status: ref('loading'), data: ref(undefined)};

  queries.set(`${BackendEndpoint.ProxyCapabilities}.${orderId}.shipment`, entry);

  return entry;
};

const notificationStoreMock = {
  add: vi.fn(),
  remove: vi.fn(),
};

const translateMock = vi.fn((key: unknown) => {
  if (typeof key === 'string') return key;
  const k = (key as {key: string}).key;
  const a = (key as {args?: Record<string, string>}).args;

  return a ? `${k}(${Object.entries(a).map(([k2, v]) => `${k2}=${v}`).join(',')})` : k;
});

const getCarrierCapabilitiesForOrderMock = vi.fn();
const addCapabilitiesClearNotificationMock = vi.fn();

vi.mock('../../stores', () => ({
  useQueryStore: () => queryStoreMock,
  useNotificationStore: () => notificationStoreMock,
}));

vi.mock('../../composables', () => ({
  useLanguage: () => ({translate: translateMock}),
}));

vi.mock('../helpers', () => ({
  addCapabilitiesClearNotification: addCapabilitiesClearNotificationMock,
  CAPABILITIES_CLEARED_NOTIFICATION_ID: 'capabilities_cleared',
  useFormCapabilities: () => ({getCarrierCapabilitiesForOrder: getCarrierCapabilitiesForOrderMock}),
}));

const setFieldRefMock = vi.fn();

vi.mock('../form-builder/utils/createValueSetter', () => ({
  setFieldRef: setFieldRefMock,
}));

const buildForm = (initial: Record<string, unknown>) => {
  const fieldByName = new Map<string, {name: string; ref: Ref<unknown>}>();

  Object.keys(initial).forEach((name) => {
    fieldByName.set(name, {name, ref: ref(initial[name])});
  });

  return {
    // `state` proxies into each field's ref so test assertions read the same source the
    // auto-clear is watching — `state[name]` reads `fieldByName.get(name).ref.value`.
    state: new Proxy({} as Record<string, unknown>, {
      get: (_, name: string) => fieldByName.get(name)?.ref.value,
    }),
    getValue: <T,>(name: string): T => fieldByName.get(name)?.ref.value as T,
    getField: (name: string) => {
      if (!fieldByName.has(name)) {
        fieldByName.set(name, {name, ref: ref(undefined)});
      }

      return fieldByName.get(name);
    },
    setExternally: (name: string, value: unknown) => {
      const field = fieldByName.get(name);

      if (field) {
        (field.ref as Ref<unknown>).value = value;
      } else {
        fieldByName.set(name, {name, ref: ref(value)});
      }
    },
  };
};

beforeEach(() => {
  queries.clear();
  notificationStoreMock.add.mockClear();
  notificationStoreMock.remove.mockClear();
  translateMock.mockClear();
  getCarrierCapabilitiesForOrderMock.mockReset();
  addCapabilitiesClearNotificationMock.mockClear();
  setFieldRefMock.mockReset();
});

const buildCarrier = (overrides: Partial<CarrierModel>): CarrierModel =>
  ({
    carrier: 'POSTNL',
    packageTypes: [],
    deliveryTypes: [],
    options: {},
    ...overrides,
  }) as CarrierModel;

/**
 * Wire `setFieldRef` to mutate the form state so the auto-clear's silent rewrites surface
 * via subsequent `form.getValue(...)` reads.
 */
const wireSetFieldRef = (form: ReturnType<typeof buildForm>) => {
  setFieldRefMock.mockImplementation((field: {name: string}, value: unknown) => {
    form.setExternally(field.name, value);
  });
};

describe('useCapabilitiesAutoClear', () => {
  it('on carrier change with shipment-empty: applies inherited defaults silently (no notification)', async () => {
    const form = buildForm({
      [FIELD_CARRIER]: 'DPD',
      [FIELD_PACKAGE_TYPE]: 'PACKAGE',
      [FIELD_DELIVERY_TYPE]: 'PICKUP',
    });

    wireSetFieldRef(form);
    // Order-query "available carriers" — getCarrierCapabilitiesForOrder resolves through form.getValue(FIELD_CARRIER)
    // so the order watcher sees fresh data for whichever carrier is currently selected.
    const orderCarriers = [
      buildCarrier({carrier: 'DPD', packageTypes: ['PACKAGE'], deliveryTypes: ['PICKUP']}),
      buildCarrier({carrier: 'POSTNL', packageTypes: ['PACKAGE'], deliveryTypes: ['STANDARD']}),
    ];

    getCarrierCapabilitiesForOrderMock.mockImplementation((f: {getValue: (n: string) => unknown}) =>
      orderCarriers.find((c) => c.carrier === f.getValue(FIELD_CARRIER)),
    );
    const shipmentEntry = registerShipmentQuery('order-1');

    const selection = ref({carrier: 'DPD', packageType: 'PACKAGE', deliveryType: 'PICKUP'}) as Ref<{
      carrier?: string;
      packageType?: string;
      deliveryType?: string;
    }>;

    const scope = effectScope();
    const {useCapabilitiesAutoClear} = await import('./useCapabilitiesAutoClear');

    scope.run(() => {
      useCapabilitiesAutoClear(
        form as never,
        ['signature'],
        'order-1',
        {POSTNL: {packageType: 'PACKAGE', deliveryType: 'STANDARD'}} as never,
        selection,
      );
    });

    // User switches DPD → POSTNL; new combo not in shipment results.
    form.setExternally(FIELD_CARRIER, 'POSTNL');
    selection.value = {carrier: 'POSTNL', packageType: 'PACKAGE', deliveryType: 'PICKUP'};
    shipmentEntry.status.value = 'success';
    shipmentEntry.data.value = [];
    await nextTick();

    expect(form.state[FIELD_PACKAGE_TYPE]).toBe('PACKAGE');
    expect(form.state[FIELD_DELIVERY_TYPE]).toBe('STANDARD');
    expect(addCapabilitiesClearNotificationMock).not.toHaveBeenCalled();

    scope.stop();
  });

  it('on packageType change with shipment-empty: reverts that axis to its prior value WITH notification', async () => {
    const form = buildForm({
      [FIELD_CARRIER]: 'POSTNL',
      [FIELD_PACKAGE_TYPE]: 'PACKAGE',
      [FIELD_DELIVERY_TYPE]: 'STANDARD',
    });

    wireSetFieldRef(form);
    getCarrierCapabilitiesForOrderMock.mockReturnValue(
      buildCarrier({carrier: 'POSTNL', packageTypes: ['PACKAGE', 'MAILBOX'], deliveryTypes: ['STANDARD']}),
    );
    const shipmentEntry = registerShipmentQuery('order-1');

    const selection = ref({carrier: 'POSTNL', packageType: 'PACKAGE', deliveryType: 'STANDARD'}) as Ref<{
      carrier?: string;
      packageType?: string;
      deliveryType?: string;
    }>;

    const scope = effectScope();
    const {useCapabilitiesAutoClear} = await import('./useCapabilitiesAutoClear');

    scope.run(() => {
      useCapabilitiesAutoClear(form as never, ['signature'], 'order-1', {} as never, selection);
    });

    // User changes packageType to MAILBOX. Shipment query confirms invalid combo.
    form.setExternally(FIELD_PACKAGE_TYPE, 'MAILBOX');
    selection.value = {carrier: 'POSTNL', packageType: 'MAILBOX', deliveryType: 'STANDARD'};
    shipmentEntry.status.value = 'success';
    shipmentEntry.data.value = [];
    await nextTick();

    expect(form.state[FIELD_PACKAGE_TYPE]).toBe('PACKAGE');
    expect(addCapabilitiesClearNotificationMock).toHaveBeenCalledTimes(1);

    const lines = addCapabilitiesClearNotificationMock.mock.calls[0][2] as string[];

    expect(lines[0]).toContain('capabilities_cleared_field_reverted');

    scope.stop();
  });

  it('on packageType change with no prior valid value: clears the field and notifies cleared (not reverted)', async () => {
    const form = buildForm({
      [FIELD_CARRIER]: 'POSTNL',
      [FIELD_PACKAGE_TYPE]: undefined,
      [FIELD_DELIVERY_TYPE]: 'STANDARD',
    });

    wireSetFieldRef(form);
    getCarrierCapabilitiesForOrderMock.mockReturnValue(
      buildCarrier({carrier: 'POSTNL', packageTypes: ['MAILBOX'], deliveryTypes: ['STANDARD']}),
    );
    const shipmentEntry = registerShipmentQuery('order-1');

    const selection = ref({carrier: 'POSTNL', packageType: undefined, deliveryType: 'STANDARD'}) as Ref<{
      carrier?: string;
      packageType?: string;
      deliveryType?: string;
    }>;

    const scope = effectScope();
    const {useCapabilitiesAutoClear} = await import('./useCapabilitiesAutoClear');

    scope.run(() => {
      useCapabilitiesAutoClear(form as never, [], 'order-1', {} as never, selection);
    });

    // First-ever packageType pick is MAILBOX → invalid combo, no prior valid value to revert to.
    form.setExternally(FIELD_PACKAGE_TYPE, 'MAILBOX');
    selection.value = {carrier: 'POSTNL', packageType: 'MAILBOX', deliveryType: 'STANDARD'};
    shipmentEntry.status.value = 'success';
    shipmentEntry.data.value = [];
    await nextTick();

    expect(form.state[FIELD_PACKAGE_TYPE]).toBeUndefined();
    const lines = addCapabilitiesClearNotificationMock.mock.calls[0][2] as string[];

    expect(lines[0]).toContain('capabilities_cleared_field_cleared');

    scope.stop();
  });

  it('on shipment success+matched: clears orphaned active options silently when carrier changed', async () => {
    const optionField = `${FIELD_SHIPMENT_OPTIONS_PREFIX}.signature`;
    const form = buildForm({
      [FIELD_CARRIER]: 'DPD',
      [FIELD_PACKAGE_TYPE]: 'PACKAGE',
      [FIELD_DELIVERY_TYPE]: 'PICKUP',
      [optionField]: TriState.On,
    });

    wireSetFieldRef(form);
    getCarrierCapabilitiesForOrderMock.mockReturnValue(buildCarrier({carrier: 'DPD'}));
    const shipmentEntry = registerShipmentQuery('order-1');

    const selection = ref({carrier: 'DPD', packageType: 'PACKAGE', deliveryType: 'PICKUP'}) as Ref<{
      carrier?: string;
      packageType?: string;
      deliveryType?: string;
    }>;

    const scope = effectScope();
    const {useCapabilitiesAutoClear} = await import('./useCapabilitiesAutoClear');

    scope.run(() => {
      useCapabilitiesAutoClear(form as never, ['signature'], 'order-1', {} as never, selection);
    });

    // User switches to POSTNL; shipment response success but POSTNL.options has no signature.
    form.setExternally(FIELD_CARRIER, 'POSTNL');
    selection.value = {carrier: 'POSTNL', packageType: 'PACKAGE', deliveryType: 'PICKUP'};
    shipmentEntry.status.value = 'success';
    shipmentEntry.data.value = [buildCarrier({carrier: 'POSTNL', options: {}})];
    await nextTick();

    expect(form.state[optionField]).toBe(TriState.Inherit);
    // Silent — option clearing during a carrier change does not produce a notification.
    expect(addCapabilitiesClearNotificationMock).not.toHaveBeenCalled();

    scope.stop();
  });

  it('readShipmentSnapshot uses the debounced selection.carrier (not form.getValue) to avoid the race', async () => {
    const form = buildForm({
      [FIELD_CARRIER]: 'POSTNL',
      [FIELD_PACKAGE_TYPE]: 'PACKAGE',
      [FIELD_DELIVERY_TYPE]: 'STANDARD',
    });

    wireSetFieldRef(form);
    getCarrierCapabilitiesForOrderMock.mockReturnValue(
      buildCarrier({carrier: 'POSTNL', packageTypes: ['PACKAGE'], deliveryTypes: ['STANDARD']}),
    );
    const shipmentEntry = registerShipmentQuery('order-1');

    // Form (live) is on POSTNL; debounced selection still on DPD; shipment results contain only DPD.
    const selection = ref({carrier: 'DPD', packageType: 'PACKAGE', deliveryType: 'PICKUP'}) as Ref<{
      carrier?: string;
      packageType?: string;
      deliveryType?: string;
    }>;

    const scope = effectScope();
    const {useCapabilitiesAutoClear} = await import('./useCapabilitiesAutoClear');

    scope.run(() => {
      useCapabilitiesAutoClear(form as never, [], 'order-1', {} as never, selection);
    });

    shipmentEntry.status.value = 'success';
    shipmentEntry.data.value = [buildCarrier({carrier: 'DPD', options: {}})];
    await nextTick();

    // Form's live POSTNL doesn't match DPD-only results, but the snapshot is computed against
    // the debounced selection (DPD), which matches → state === 'matched', no rollback fires.
    expect(addCapabilitiesClearNotificationMock).not.toHaveBeenCalled();
    expect(form.state[FIELD_PACKAGE_TYPE]).toBe('PACKAGE');

    scope.stop();
  });
});
