/** @vitest-environment happy-dom */
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {tests, usePdkCheckout} from '@myparcel-dev/pdk-checkout-common';
import {HIDE_DELIVERY_OPTIONS, SHOW_DELIVERY_OPTIONS} from '@myparcel-dev/delivery-options';
import {useDeliveryOptionsStore} from '../utils';
import {initializeCheckoutDeliveryOptions} from '../initializeCheckoutDeliveryOptions';

const events: CustomEvent[] = [];
const eventNames = [HIDE_DELIVERY_OPTIONS, SHOW_DELIVERY_OPTIONS];
const receive = (event: Event): void => {
  events.push(event as CustomEvent);
};

beforeEach(async () => {
  tests.doRequestSpy.mockResolvedValue({data: {context: [{checkout: tests.getMockCheckoutContext()}]}});
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
});

afterEach(async () => {
  if (vi.isFakeTimers()) await vi.runOnlyPendingTimersAsync();

  vi.useRealTimers();
  eventNames.forEach((name) => document.removeEventListener(name, receive));
});

describe('showOrHideDeliveryOptions', () => {
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

  it('does not show or hide the delivery options when enabled changes and changes back within the delay', async () => {
    vi.useFakeTimers();
    const store = useDeliveryOptionsStore();
    await store.set({enabled: false});
    await store.set({enabled: true});
    await vi.advanceTimersByTimeAsync(110);
    expect(events.filter((event) => [HIDE_DELIVERY_OPTIONS, SHOW_DELIVERY_OPTIONS].includes(event.type))).toEqual([]);
  });
});
