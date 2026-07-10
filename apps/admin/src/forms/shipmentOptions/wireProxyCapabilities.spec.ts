import {effectScope, nextTick, ref} from 'vue';
import {describe, expect, it, vi, beforeEach} from 'vitest';
import {BackendEndpoint, TriState} from '@myparcel-dev/pdk-common';
import {FIELD_CARRIER, FIELD_DELIVERY_TYPE, FIELD_MANUAL_WEIGHT, FIELD_PACKAGE_TYPE} from './field';

const queryStoreMock = {
  register: vi.fn(),
  unregister: vi.fn(),
};

vi.mock('../../stores', () => ({
  useQueryStore: () => queryStoreMock,
}));

vi.mock('../../services', () => ({
  globalLogger: {debug: vi.fn(), error: vi.fn(), warn: vi.fn(), info: vi.fn()},
}));

const useOrderCapabilitiesQueryMock = vi.fn(() => ({status: ref('loading'), data: ref(undefined)}));
const useShipmentCapabilitiesQueryMock = vi.fn(() => ({status: ref('loading'), data: ref(undefined)}));

vi.mock('../../actions/composables/queries/account/useOrderCapabilitiesQuery', () => ({
  useOrderCapabilitiesQuery: useOrderCapabilitiesQueryMock,
}));

vi.mock('../../actions/composables/queries/account/useShipmentCapabilitiesQuery', () => ({
  useShipmentCapabilitiesQuery: useShipmentCapabilitiesQueryMock,
}));

const buildForm = (initial: Record<string, unknown>) => {
  const fields = new Map<string, {ref: ReturnType<typeof ref>}>();

  Object.keys(initial).forEach((name) => {
    fields.set(name, {ref: ref(initial[name])});
  });

  return {
    getValue: <T>(name: string): T => fields.get(name)?.ref.value as T,
    setExternally: (name: string, value: unknown) => {
      const field = fields.get(name);

      if (field) {
        field.ref.value = value;
      } else {
        fields.set(name, {ref: ref(value)});
      }
    },
  };
};

beforeEach(() => {
  queryStoreMock.register.mockClear();
  queryStoreMock.unregister.mockClear();
  useOrderCapabilitiesQueryMock.mockClear();
  useShipmentCapabilitiesQueryMock.mockClear();
});

const orderShape = (cc = 'NL', initialWeight = 1500, isBusiness = false) =>
  ({
    externalIdentifier: 'order-1',
    shippingAddress: {cc, isBusiness},
    physicalProperties: {initialWeight},
  } as never);

describe('wireProxyCapabilities', () => {
  it('treats TriState.Inherit (-1) as "no manual override" and falls back to initialWeight', async () => {
    const form = buildForm({
      [FIELD_CARRIER]: 'POSTNL',
      [FIELD_PACKAGE_TYPE]: 'PACKAGE',
      [FIELD_DELIVERY_TYPE]: 'STANDARD',
      [FIELD_MANUAL_WEIGHT]: TriState.Inherit,
    });

    const scope = effectScope();
    const {wireProxyCapabilities} = await import('./wireProxyCapabilities');

    scope.run(() => {
      wireProxyCapabilities(form as never, orderShape('NL', 2500));
    });

    // The order query is wired with a `computed` over the captured input — read its argument
    // ref's value to verify the manual-weight guard.
    const orderInputRef = useOrderCapabilitiesQueryMock.mock.calls[0][0] as {value: {weight?: number}};

    expect(orderInputRef.value.weight).toBe(2500);

    scope.stop();
  });

  it('uses positive manual weight when set', async () => {
    const form = buildForm({
      [FIELD_CARRIER]: 'POSTNL',
      [FIELD_PACKAGE_TYPE]: 'PACKAGE',
      [FIELD_DELIVERY_TYPE]: 'STANDARD',
      [FIELD_MANUAL_WEIGHT]: 4200,
    });

    const scope = effectScope();
    const {wireProxyCapabilities} = await import('./wireProxyCapabilities');

    scope.run(() => {
      wireProxyCapabilities(form as never, orderShape('NL', 2500));
    });

    const orderInputRef = useOrderCapabilitiesQueryMock.mock.calls[0][0] as {value: {weight?: number}};

    // Wait for the debounce (refDebounced default 100ms in this codebase).
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    await nextTick();

    expect(orderInputRef.value.weight).toBe(4200);

    scope.stop();
  });

  it('forwards the recipient business flag from the order shipping address to both queries', async () => {
    const form = buildForm({
      [FIELD_CARRIER]: 'POSTNL',
      [FIELD_PACKAGE_TYPE]: 'PACKAGE',
      [FIELD_DELIVERY_TYPE]: 'STANDARD',
      [FIELD_MANUAL_WEIGHT]: TriState.Inherit,
    });

    const scope = effectScope();
    const {wireProxyCapabilities} = await import('./wireProxyCapabilities');

    scope.run(() => {
      wireProxyCapabilities(form as never, orderShape('NL', 1500, true));
    });

    const orderInputRef = useOrderCapabilitiesQueryMock.mock.calls[0][0] as {value: {isBusiness?: boolean}};
    const selectionRef = useShipmentCapabilitiesQueryMock.mock.calls[0][0] as {value: {isBusiness?: boolean}};

    expect(orderInputRef.value.isBusiness).toBe(true);
    expect(selectionRef.value.isBusiness).toBe(true);

    scope.stop();
  });

  it('skips wiring and returns undefined when the order has no externalIdentifier (bulk path)', async () => {
    const form = buildForm({});

    const scope = effectScope();
    const {wireProxyCapabilities} = await import('./wireProxyCapabilities');
    let result: unknown;

    scope.run(() => {
      result = wireProxyCapabilities(form as never, {} as never);
    });

    expect(result).toBeUndefined();
    expect(queryStoreMock.register).not.toHaveBeenCalled();
    expect(useOrderCapabilitiesQueryMock).not.toHaveBeenCalled();
    expect(useShipmentCapabilitiesQueryMock).not.toHaveBeenCalled();

    scope.stop();
  });

  it('unregisters BOTH query modifiers when the form scope disposes', async () => {
    const form = buildForm({
      [FIELD_CARRIER]: 'POSTNL',
      [FIELD_PACKAGE_TYPE]: 'PACKAGE',
      [FIELD_DELIVERY_TYPE]: 'STANDARD',
      [FIELD_MANUAL_WEIGHT]: TriState.Inherit,
    });

    const scope = effectScope();
    const {wireProxyCapabilities} = await import('./wireProxyCapabilities');

    scope.run(() => {
      wireProxyCapabilities(form as never, orderShape());
    });

    // Before dispose: both modifiers registered, neither unregistered.
    expect(queryStoreMock.register).toHaveBeenCalledTimes(2);
    expect(queryStoreMock.unregister).not.toHaveBeenCalled();

    scope.stop();

    expect(queryStoreMock.unregister).toHaveBeenCalledTimes(2);
    expect(queryStoreMock.unregister).toHaveBeenCalledWith(BackendEndpoint.ProxyCapabilities, 'order-1.order');
    expect(queryStoreMock.unregister).toHaveBeenCalledWith(BackendEndpoint.ProxyCapabilities, 'order-1.shipment');
  });
});
