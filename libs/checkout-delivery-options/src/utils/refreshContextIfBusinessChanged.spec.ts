/** @vitest-environment happy-dom */
import {beforeEach, describe, expect, it} from 'vitest';
import {PdkField, tests, updateCheckoutForm, useCheckoutStore, usePdkCheckout} from '@myparcel-dev/pdk-checkout-common';
import {initializeCheckoutDeliveryOptions} from '../initializeCheckoutDeliveryOptions';
import {refreshContextIfBusinessChanged} from './refreshContextIfBusinessChanged';

const IS_BUSINESS_KEY = 'is-business';

const formData = (isBusiness: boolean): Record<string, string> => ({
  'address-type': 'billing',
  'b-address1': 'Antareslaan 31',
  'b-address2': '',
  'b-city': 'Hoofddorp',
  'b-country': 'NL',
  'b-postal-code': '2132JE',
  'shipping-method': 'standard',
  [IS_BUSINESS_KEY]: isBusiness ? '1' : '',
});

const flush = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve));
  await new Promise((resolve) => setTimeout(resolve));
};

/** Report the recipient as a business or not, the way a platform does on a form change. */
const reportBusiness = async (isBusiness: boolean): Promise<void> => {
  tests.getFormDataSpy.mockReturnValue(formData(isBusiness));
  updateCheckoutForm();
  await flush();
};

/** The flag the context was built with, as the server sends it back. */
const setContextBusiness = async (isBusiness: boolean): Promise<void> => {
  const checkout = useCheckoutStore();

  await checkout.set({
    context: {...checkout.state.context, config: {...checkout.state.context.config, isBusiness}},
  });
};

/** Start a checkout where the platform reports the business flag, unless told otherwise. */
const start = async (reportsField = true): Promise<void> => {
  await tests.mockPdkCheckout(reportsField ? {formData: {[PdkField.IsBusiness]: IS_BUSINESS_KEY}} : undefined);
  usePdkCheckout().onInitialize(() => initializeCheckoutDeliveryOptions());
  await flush();
};

describe('refreshContextIfBusinessChanged', () => {
  beforeEach(() => {
    tests.doRequestSpy.mockResolvedValue({data: {context: [{checkout: tests.getMockCheckoutContext()}]}});
    tests.getFormDataSpy.mockReturnValue(formData(false));
  });

  it('fetches a new context when the recipient became a business', async () => {
    await start();
    await setContextBusiness(false);
    await reportBusiness(true);

    tests.doRequestSpy.mockClear();
    await refreshContextIfBusinessChanged();

    expect(tests.doRequestSpy).toHaveBeenCalledTimes(1);
  });

  it('does not fetch a new context when the context already has the reported flag', async () => {
    await start();
    await setContextBusiness(true);
    await reportBusiness(true);

    tests.doRequestSpy.mockClear();
    await refreshContextIfBusinessChanged();

    expect(tests.doRequestSpy).not.toHaveBeenCalled();
  });

  it('does not fetch a new context when the platform does not report the flag', async () => {
    await start(false);
    await setContextBusiness(true);

    tests.doRequestSpy.mockClear();
    await refreshContextIfBusinessChanged();

    expect(tests.doRequestSpy).not.toHaveBeenCalled();
  });

  it('tries again when the context comes back with the old flag', async () => {
    await start();
    await setContextBusiness(false);
    await reportBusiness(true);

    // The server did not have the company yet, so the context it returns still says private.
    tests.doRequestSpy.mockResolvedValue({
      data: {context: [{checkout: tests.getMockCheckoutContext({config: {isBusiness: false}})}]},
    });

    await refreshContextIfBusinessChanged();

    tests.doRequestSpy.mockClear();
    await refreshContextIfBusinessChanged();

    expect(tests.doRequestSpy).toHaveBeenCalledTimes(1);
  });
});
