/** @vitest-environment happy-dom */
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {tests, usePdkCheckout} from '@myparcel-dev/pdk-checkout-common';
import {UPDATE_CONFIG_IN} from '@myparcel-dev/delivery-options';
import {updateContext, useDeliveryOptionsStore} from '../utils';
import {initializeCheckoutDeliveryOptions} from '../initializeCheckoutDeliveryOptions';

const events: CustomEvent[] = [];
const receiveConfig = (event: Event): void => {
  events.push(event as CustomEvent);
};

const setContextWeight = async (weight: number | null): Promise<void> => {
  const context = tests.getMockCheckoutContext();
  context.config.physicalProperties = weight === null ? null : {weight};
  tests.doRequestSpy.mockResolvedValueOnce({data: {context: [{checkout: context}]}});
  await updateContext();
};

describe('checkout context weight events', () => {
  beforeEach(async () => {
    tests.doRequestSpy.mockResolvedValue({data: {context: [{checkout: tests.getMockCheckoutContext()}]}});
    await tests.mockPdkCheckout();
    usePdkCheckout().onInitialize(() => initializeCheckoutDeliveryOptions());
    const element = document.querySelector('#delivery-options');

    if (element) element.innerHTML = '<div>Rendered widget</div>';

    // Finish the initial render event before asserting subsequent config updates.
    await vi.waitFor(() => expect(useDeliveryOptionsStore().state.enabled).toBe(true));
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 120);
    });
    events.length = 0;
    document.addEventListener(UPDATE_CONFIG_IN, receiveConfig);
  });

  afterEach(() => {
    document.removeEventListener(UPDATE_CONFIG_IN, receiveConfig);
  });

  it('forwards known, changed and cleared weights through the real widget config event', async () => {
    for (const weight of [30000, 15000, null]) {
      const expected = weight === null ? null : {weight};
      await setContextWeight(weight);
      await vi.waitFor(() => {
        expect(events.at(-1)?.detail.config.physicalProperties).toEqual(expected);
      });
    }

    expect(UPDATE_CONFIG_IN).toBe('myparcel_update_config');
  });

  it('does not send another config event for an unchanged cart context', async () => {
    await setContextWeight(30000);
    await vi.waitFor(() => expect(events.at(-1)?.detail.config.physicalProperties.weight).toBe(30000));
    const count = events.length;
    await setContextWeight(30000);
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    expect(events).toHaveLength(count);
  });
});
