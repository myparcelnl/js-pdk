/** @vitest-environment happy-dom */
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {tests, usePdkCheckout} from '@myparcel-dev/pdk-checkout-common';
import {UPDATED_DELIVERY_OPTIONS} from '@myparcel-dev/delivery-options';
import {useDeliveryOptionsStore} from '../utils';
import {initializeCheckoutDeliveryOptions} from '../initializeCheckoutDeliveryOptions';

beforeEach(async () => {
  tests.doRequestSpy.mockResolvedValue({data: {context: [{checkout: tests.getMockCheckoutContext()}]}});
  await tests.mockPdkCheckout();
  window.MyParcelPdk.events.deliveryOptionsUpdated = 'pdk_delivery_options_updated';
  usePdkCheckout().onInitialize(() => initializeCheckoutDeliveryOptions());

  await vi.waitFor(() => expect(useDeliveryOptionsStore().state.enabled).toBe(true));
});

describe('updateDeliveryOptionsOutput', () => {
  it('writes null to the hidden input when the delivery options send an empty selection', () => {
    const store = useDeliveryOptionsStore();
    const {hiddenInput} = store.state;

    if (!hiddenInput) throw new Error('Expected the initialized checkout input');

    hiddenInput.value = JSON.stringify({deliveryType: 'pickup', carrier: 'dpd'});

    document.dispatchEvent(new CustomEvent(UPDATED_DELIVERY_OPTIONS, {detail: undefined}));

    expect(hiddenInput.value).toBe('null');
    expect(store.state.output).toBeNull();
  });
});
