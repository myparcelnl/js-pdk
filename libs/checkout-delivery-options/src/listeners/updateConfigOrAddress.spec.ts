import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {tests, usePdkCheckout} from '@myparcel-dev/pdk-checkout-common';
import {UPDATE_CONFIG_IN} from '@myparcel-dev/delivery-options';
import {initializeCheckoutDeliveryOptions} from '../initializeCheckoutDeliveryOptions';
import {useDeliveryOptionsStore} from '../utils';

/** @vitest-environment happy-dom */

const DEBOUNCE_MS = 150;

const setupStore = async (): Promise<ReturnType<typeof useDeliveryOptionsStore>> => {
  await tests.mockPdkCheckout();

  usePdkCheckout().onInitialize(() => initializeCheckoutDeliveryOptions());

  // The config event only goes out when the delivery options are on screen, which the code
  // recognises by the element having content.
  const element = document.querySelector('#delivery-options');

  if (element) {
    element.innerHTML = '<div>delivery options</div>';
  }

  const deliveryOptions = useDeliveryOptionsStore();

  // Give the store a starting point to compare against, then let the debounce settle so only
  // the update under test can fire an event.
  await deliveryOptions.set({
    configuration: {
      ...deliveryOptions.state.configuration,
      config: {},
      cartShipmentOptions: {postnl: {signature: true}},
    },
  });

  vi.advanceTimersByTime(DEBOUNCE_MS);

  return deliveryOptions;
};

describe('updateConfigOrAddress', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('tells the delivery options when only the cart shipment options changed', async () => {
    const deliveryOptions = await setupStore();
    const listener = vi.fn();

    document.addEventListener(UPDATE_CONFIG_IN, listener);

    await deliveryOptions.set({
      configuration: {
        ...deliveryOptions.state.configuration,
        cartShipmentOptions: {postnl: {signature: true, onlyRecipient: true}},
      },
    });

    vi.advanceTimersByTime(DEBOUNCE_MS);

    expect(listener).toHaveBeenCalledTimes(1);

    document.removeEventListener(UPDATE_CONFIG_IN, listener);
  });

  it('stays quiet when nothing in the configuration changed', async () => {
    const deliveryOptions = await setupStore();
    const listener = vi.fn();

    document.addEventListener(UPDATE_CONFIG_IN, listener);

    await deliveryOptions.set({
      configuration: {
        ...deliveryOptions.state.configuration,
        cartShipmentOptions: {postnl: {signature: true}},
      },
    });

    vi.advanceTimersByTime(DEBOUNCE_MS);

    expect(listener).not.toHaveBeenCalled();

    document.removeEventListener(UPDATE_CONFIG_IN, listener);
  });
});
