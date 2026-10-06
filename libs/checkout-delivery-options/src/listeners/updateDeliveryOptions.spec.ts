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
    // updateContext() -> fetchCheckoutContext() calls doRequest; return a full checkout context so the
    // refetch installs valid settings (allowedShippingMethods), mirroring production. A minimal shape
    // would wipe settings and break the downstream shippingMethodHasDeliveryOptions read.
    tests.doRequestSpy.mockResolvedValue({data: {context: [{checkout: tests.getMockCheckoutContext()}]}});
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

  it('refetches the context when toggling to an address in a different country', async () => {
    // updateContext() -> fetchCheckoutContext() is the only doRequest in this path, so the spy proves
    // the reset+refresh branch ran. This is what re-notifies the widget of the new country's carriers.
    tests.doRequestSpy.mockClear();

    // Billing (NL) -> shipping (FR): the effective delivery country changes, so the context must refetch.
    await changeAddressTypeTo(AddressType.Shipping);

    expect(tests.doRequestSpy).toHaveBeenCalled();
  });

  it('does not refetch the context when toggling between addresses in the same country', async () => {
    // Both buckets NL: toggling flips addressType but the effective delivery country is unchanged,
    // so we must NOT trigger a needless hide/reshow of the widget.
    const sameCountry = (addressType: AddressType): Record<string, string> => ({
      ...formDataFor(addressType),
      's-country': BILLING_CC,
    });

    tests.getFormDataSpy.mockReturnValue(sameCountry(AddressType.Billing));
    updateCheckoutForm();
    await flush();

    tests.doRequestSpy.mockClear();

    tests.getFormDataSpy.mockReturnValue(sameCountry(AddressType.Shipping));
    updateCheckoutForm();
    await flush();

    expect(tests.doRequestSpy).not.toHaveBeenCalled();
  });
});
