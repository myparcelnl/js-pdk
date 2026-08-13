import {describe, expect, it} from 'vitest';
import {tests, usePdkCheckout} from '@myparcel-dev/pdk-checkout-common';
import {initializeCheckoutDeliveryOptions} from '../initializeCheckoutDeliveryOptions';
import {useDeliveryOptionsStore} from './useDeliveryOptionsStore';
import {updateContext} from './updateContext';

/** @vitest-environment happy-dom */

const EXISTING_CART_OPTIONS = {postnl: {signature: true}};
const FRESH_CART_OPTIONS = {postnl: {ageCheck: true, signature: true, onlyRecipient: true}};

const doTestSetup = async (): Promise<void> => {
  await tests.mockPdkCheckout();

  usePdkCheckout().onInitialize(() => initializeCheckoutDeliveryOptions());

  const deliveryOptions = useDeliveryOptionsStore();

  await deliveryOptions.set({
    configuration: {
      ...deliveryOptions.state.configuration,
      cartShipmentOptions: EXISTING_CART_OPTIONS,
    },
  });
};

describe('updateContext', () => {
  it('replaces the cart shipment options when the fresh context carries them', async () => {
    await doTestSetup();

    tests.doRequestSpy.mockResolvedValueOnce({
      data: {context: [{checkout: {config: {}, strings: {}, cartShipmentOptions: FRESH_CART_OPTIONS}}]},
    });

    await updateContext();

    expect(useDeliveryOptionsStore().state.configuration.cartShipmentOptions).toEqual(FRESH_CART_OPTIONS);
  });

  it('keeps the known cart shipment options when the context omits them', async () => {
    await doTestSetup();

    // Older PDK versions don't send the key, and a failed fetch falls back to an empty context.
    tests.doRequestSpy.mockResolvedValueOnce({data: {context: [{checkout: {config: {}, strings: {}}}]}});

    await updateContext();

    expect(useDeliveryOptionsStore().state.configuration.cartShipmentOptions).toEqual(EXISTING_CART_OPTIONS);
  });
});
