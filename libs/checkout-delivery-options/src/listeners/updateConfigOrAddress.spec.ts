/** @vitest-environment happy-dom */
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {tests, usePdkCheckout} from '@myparcel-dev/pdk-checkout-common';
import {UPDATE_CONFIG_IN, UPDATE_DELIVERY_OPTIONS} from '@myparcel-dev/delivery-options';
import {updateContext, useDeliveryOptionsStore} from '../utils';
import {initializeCheckoutDeliveryOptions} from '../initializeCheckoutDeliveryOptions';

const weight = (value: number) => ({weight: value});
const events: CustomEvent[] = [];
const eventNames = [UPDATE_CONFIG_IN, UPDATE_DELIVERY_OPTIONS];
const receive = (event: Event): void => {
  events.push(event as CustomEvent);
};

const configEvents = (): CustomEvent[] => events.filter((event) => event.type === UPDATE_CONFIG_IN);

const setContextWeight = async (grams: number | null): Promise<void> => {
  const context = tests.getMockCheckoutContext();
  context.config.physicalProperties = grams === null ? null : weight(grams);
  tests.doRequestSpy.mockResolvedValueOnce({data: {context: [{checkout: context}]}});
  await updateContext();
};

/**
 * Render the checkout with a context from the PDK, then start recording the events that
 * updateConfigOrAddress sends to the widget. The initial render event is not recorded.
 */
const renderCheckout = async (grams?: number): Promise<void> => {
  const context = tests.getMockCheckoutContext();

  if (grams !== undefined) {
    context.config.physicalProperties = weight(grams);
    tests.getMockCheckoutContext.mockReturnValueOnce(context);
  }

  tests.doRequestSpy.mockResolvedValue({data: {context: [{checkout: context}]}});
  await tests.mockPdkCheckout();
  usePdkCheckout().onInitialize(() => initializeCheckoutDeliveryOptions());
  const element = document.querySelector('#delivery-options');

  if (element) element.innerHTML = '<div>Rendered widget</div>';

  await vi.waitFor(() => expect(useDeliveryOptionsStore().state.enabled).toBe(true));
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 120);
  });
  events.length = 0;
  eventNames.forEach((name) => document.addEventListener(name, receive));
};

afterEach(async () => {
  if (vi.isFakeTimers()) await vi.runOnlyPendingTimersAsync();

  vi.useRealTimers();
  eventNames.forEach((name) => document.removeEventListener(name, receive));
});

describe('updateConfigOrAddress', () => {
  beforeEach(async () => {
    await renderCheckout(30000);
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

    const updates = configEvents();
    expect(updates).toHaveLength(1);
    expect(updates[0].detail.config.physicalProperties).toBeNull();
  });

  it('forwards a new address when the delivery configuration is unchanged', async () => {
    vi.useFakeTimers();
    const store = useDeliveryOptionsStore();
    const address = {...store.state.configuration.address, cc: 'BE'};
    await store.set({configuration: {...store.state.configuration, address}});
    await vi.advanceTimersByTimeAsync(110);

    const updates = events.filter((event) => event.type === UPDATE_DELIVERY_OPTIONS);
    expect(updates).toHaveLength(1);
    expect(updates[0].detail.address).toEqual(address);
    expect(configEvents()).toHaveLength(0);
  });

  it('does not render an address change while the widget is disabled', async () => {
    vi.useFakeTimers();
    const store = useDeliveryOptionsStore();
    await store.set({enabled: false});
    await vi.advanceTimersByTimeAsync(110);
    events.length = 0;

    await store.set({configuration: {...store.state.configuration, address: {cc: 'BE'}}});
    await vi.advanceTimersByTimeAsync(110);

    expect(events.filter((event) => event.type === UPDATE_DELIVERY_OPTIONS)).toHaveLength(0);
  });
});

describe('updateConfigOrAddress after a checkout context update', () => {
  beforeEach(async () => {
    await renderCheckout();
  });

  it('forwards known, changed and cleared weights through the real widget config event', async () => {
    for (const grams of [30000, 15000, null]) {
      const expected = grams === null ? null : weight(grams);
      await setContextWeight(grams);
      await vi.waitFor(() => {
        expect(configEvents().at(-1)?.detail.config.physicalProperties).toEqual(expected);
      });
    }

    expect(UPDATE_CONFIG_IN).toBe('myparcel_update_config');
  });

  it('does not send another config event for an unchanged cart context', async () => {
    await setContextWeight(30000);
    await vi.waitFor(() => expect(configEvents().at(-1)?.detail.config.physicalProperties.weight).toBe(30000));
    const count = configEvents().length;
    await setContextWeight(30000);
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    expect(configEvents()).toHaveLength(count);
  });
});
