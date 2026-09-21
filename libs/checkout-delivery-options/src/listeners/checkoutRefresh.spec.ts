/** @vitest-environment happy-dom */
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {tests, useCheckoutStore, usePdkCheckout} from '@myparcel-dev/pdk-checkout-common';
import {
  HIDE_DELIVERY_OPTIONS,
  SHOW_DELIVERY_OPTIONS,
  UPDATED_DELIVERY_OPTIONS,
  UPDATE_CONFIG_IN,
} from '@myparcel-dev/delivery-options';
import {updateContext, useDeliveryOptionsStore} from '../utils';
import {initializeCheckoutDeliveryOptions} from '../initializeCheckoutDeliveryOptions';

const weight = (value: number) => ({weight: {value, unit: 'g' as const}});
const events: CustomEvent[] = [];
const eventNames = [HIDE_DELIVERY_OPTIONS, SHOW_DELIVERY_OPTIONS, UPDATE_CONFIG_IN];
const receive = (event: Event): void => {
  events.push(event as CustomEvent);
};

beforeEach(async () => {
  const context = tests.getMockCheckoutContext();
  context.config.physicalProperties = weight(30000);
  tests.getMockCheckoutContext.mockReturnValueOnce(context);
  tests.doRequestSpy.mockResolvedValue({data: {context: [{checkout: context}]}});
  await tests.mockPdkCheckout();
  window.MyParcelPdk.events.deliveryOptionsUpdated = 'pdk_delivery_options_updated';
  usePdkCheckout().onInitialize(() => initializeCheckoutDeliveryOptions());
  const element = document.querySelector('#delivery-options');

  if (element) element.innerHTML = '<div>Rendered widget</div>';

  await vi.waitFor(() => expect(useDeliveryOptionsStore().state.enabled).toBe(true));
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 120);
  });
  events.length = 0;
  eventNames.forEach((name) => document.addEventListener(name, receive));
});

afterEach(async () => {
  if (vi.isFakeTimers()) await vi.runOnlyPendingTimersAsync();

  vi.useRealTimers();
  eventNames.forEach((name) => document.removeEventListener(name, receive));
});

describe('checkout context responses', () => {
  it.each([
    ['missing response', undefined],
    ['empty response', {}],
    ['empty context list', {data: {context: []}}],
    ['missing checkout', {data: {context: [{}]}}],
    ['empty checkout', {data: {context: [{checkout: {}}]}}],
    ['empty settings', {data: {context: [{checkout: {settings: {}}}]}}],
    ['null settings', {data: {context: [{checkout: {settings: null}}]}}],
  ])('preserves usable settings after %s and recovers on the next request', async (...[, response]) => {
    const checkout = useCheckoutStore();
    const {settings} = checkout.state.context;
    tests.doRequestSpy.mockResolvedValueOnce(response);

    await expect(updateContext()).rejects.toThrow('Invalid checkout context response');

    expect(checkout.state.context.settings).toBe(settings);
    expect(useDeliveryOptionsStore().state.configuration.config.physicalProperties).toBeNull();

    const context = tests.getMockCheckoutContext();
    context.config.physicalProperties = weight(15000);
    tests.doRequestSpy.mockResolvedValueOnce({data: {context: [{checkout: context}]}});
    await updateContext();
    expect(checkout.state.context.config.physicalProperties).toEqual(weight(15000));
  });

  it('rejects malformed shipping-method settings before replacing the context', async () => {
    const checkout = useCheckoutStore();
    const {settings} = checkout.state.context;
    const context = tests.getMockCheckoutContext();
    tests.doRequestSpy.mockResolvedValueOnce({
      data: {
        context: [
          {
            checkout: {
              ...context,
              settings: {...context.settings, allowedShippingMethods: {package: null}},
            },
          },
        ],
      },
    });

    await expect(updateContext()).rejects.toThrow('Invalid checkout context response');
    expect(checkout.state.context.settings).toBe(settings);
  });

  it('does not fetch when the Delivery Options module is absent', async () => {
    tests.doRequestSpy.mockClear();
    // The core module initializes this slot to null until Delivery Options is loaded.
    Object.assign(window.MyParcelPdk.stores, {deliveryOptions: null});
    await expect(updateContext()).resolves.toBeUndefined();
    expect(tests.doRequestSpy).not.toHaveBeenCalled();
  });
});

describe('consecutive store updates', () => {
  it.each([false, true])('preserves enabled=%s when a configuration update follows immediately', async (enabled) => {
    vi.useFakeTimers();
    const store = useDeliveryOptionsStore();
    await store.set({enabled: !enabled});
    await vi.advanceTimersByTimeAsync(110);
    events.length = 0;

    await store.set({enabled});
    await store.set({configuration: {...store.state.configuration, strings: {standardDeliveryTitle: 'Updated'}}});
    await vi.advanceTimersByTimeAsync(110);

    expect(
      events.filter((event) => event.type === (enabled ? SHOW_DELIVERY_OPTIONS : HIDE_DELIVERY_OPTIONS)),
    ).toHaveLength(1);
  });

  it('keeps the latest weight reset when output changes within the same debounce window', async () => {
    vi.useFakeTimers();
    const store = useDeliveryOptionsStore();
    for (const physicalProperties of [weight(15000), null]) {
      await store.set({
        configuration: {
          ...store.state.configuration,
          config: {...store.state.configuration.config, physicalProperties},
        },
      });
    }

    await store.set({output: {carrier: 'dpd'}});
    await vi.advanceTimersByTimeAsync(110);

    const updates = events.filter((event) => event.type === UPDATE_CONFIG_IN);
    expect(updates).toHaveLength(1);
    expect(updates[0].detail.config.physicalProperties).toBeNull();
  });

  it('does not toggle visibility when a burst ends in the original state', async () => {
    vi.useFakeTimers();
    const store = useDeliveryOptionsStore();
    await store.set({enabled: false});
    await store.set({enabled: true});
    await vi.advanceTimersByTimeAsync(110);
    expect(events.filter((event) => [HIDE_DELIVERY_OPTIONS, SHOW_DELIVERY_OPTIONS].includes(event.type))).toEqual([]);
  });

  it('clears the submitted selection through the real CustomEvent boundary', () => {
    const store = useDeliveryOptionsStore();
    const {hiddenInput} = store.state;

    if (!hiddenInput) throw new Error('Expected the initialized checkout input');

    hiddenInput.value = JSON.stringify({deliveryType: 'pickup', carrier: 'dpd'});

    document.dispatchEvent(new CustomEvent(UPDATED_DELIVERY_OPTIONS, {detail: undefined}));

    expect(hiddenInput.value).toBe('null');
    expect(store.state.output).toBeNull();
  });
});
