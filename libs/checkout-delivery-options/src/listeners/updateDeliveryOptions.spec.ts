/** @vitest-environment happy-dom */
import {beforeEach, describe, expect, it} from 'vitest';
import {AddressType, tests, updateCheckoutForm, usePdkCheckout} from '@myparcel-dev/pdk-checkout-common';
import {useDeliveryOptionsStore} from '../utils';
import {initializeCheckoutDeliveryOptions} from '../initializeCheckoutDeliveryOptions';

const BILLING_CC = 'NL';
const SHIPPING_CC = 'FR';

const formDataFor = (addressType: AddressType): Record<string, string> => ({
  'address-type': addressType,
  'b-address1': 'Billingstraat 1',
  'b-address2': '',
  'b-city': 'Amsterdam',
  'b-country': BILLING_CC,
  'b-postal-code': '1000AA',
  's-address1': 'Rue de Shipping 1',
  's-address2': '',
  's-city': 'Paris',
  's-country': SHIPPING_CC,
  's-postal-code': '75000',
  'shipping-method': 'standard',
});

const flush = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve));
  await new Promise((resolve) => setTimeout(resolve));
};

// Simulate one checkout form change: the form now reads as `addressType`, then the change fires updateCheckoutForm.
const changeAddressTypeTo = async (addressType: AddressType): Promise<void> => {
  tests.getFormDataSpy.mockReturnValue(formDataFor(addressType));
  updateCheckoutForm();
  await flush();
};

const currentDeliveryCc = (): undefined | string => useDeliveryOptionsStore().state.configuration.address.cc;

describe('updateDeliveryOptions - ship-to-different-address toggle (billing NL / shipping FR)', () => {
  beforeEach(async () => {
    // updateContext() -> fetchCheckoutContext() calls doRequest; give it a valid shape in case it runs.
    tests.doRequestSpy.mockResolvedValue({data: {context: [{checkout: {config: {}, strings: {}}}]}});
    // Start on the billing address (separate shipping address off), like a fresh checkout.
    tests.getFormDataSpy.mockReturnValue(formDataFor(AddressType.Billing));

    await tests.mockPdkCheckout();
    usePdkCheckout().onInitialize(() => initializeCheckoutDeliveryOptions());
  });

  it('resolves against the address type the user just selected, not the previous one', async () => {
    // Turn the checkbox on: a single change event switching to the separate shipping address (FR).
    await changeAddressTypeTo(AddressType.Shipping);

    // Fails today: shows 'NL'. getDeliveryOptionsAddress reads the committed addressType, but updateCheckoutForm
    // computes that from getAddressType() reading the *previous* form, so it lags one event behind the DOM.
    expect(currentDeliveryCc()).toBe(SHIPPING_CC);

    // Turn the checkbox off again: should immediately fall back to billing (NL). Today it shows the lagged 'FR'.
    await changeAddressTypeTo(AddressType.Billing);
    expect(currentDeliveryCc()).toBe(BILLING_CC);
  });
});
