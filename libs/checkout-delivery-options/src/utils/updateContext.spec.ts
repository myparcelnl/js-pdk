/** @vitest-environment happy-dom */
import {beforeEach, describe, expect, it} from 'vitest';
import {tests, useCheckoutStore, usePdkCheckout} from '@myparcel-dev/pdk-checkout-common';
import {initializeCheckoutDeliveryOptions} from '../initializeCheckoutDeliveryOptions';
import {updateContext} from './updateContext';

const flush = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve));
  await new Promise((resolve) => setTimeout(resolve));
};

const response = (isBusiness: boolean): unknown => ({
  data: {context: [{checkout: tests.getMockCheckoutContext({config: {isBusiness}})}]},
});

const businessInContext = (): unknown => useCheckoutStore().state.context.config?.isBusiness;

describe('updateContext', () => {
  beforeEach(async () => {
    tests.doRequestSpy.mockResolvedValue(response(false));

    await tests.mockPdkCheckout();
    usePdkCheckout().onInitialize(() => initializeCheckoutDeliveryOptions());
    await flush();
  });

  it('keeps the context of the response that came back last', async () => {
    tests.doRequestSpy.mockResolvedValue(response(true));

    await updateContext();

    expect(businessInContext()).toBe(true);
  });

  it('ignores a response that a later request already replaced', async () => {
    let releaseFirst: (value: unknown) => void = () => undefined;

    tests.doRequestSpy.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          releaseFirst = resolve;
        }),
    );
    tests.doRequestSpy.mockImplementationOnce(() => Promise.resolve(response(true)));

    // The slow request starts first, the second one overtakes it and settles.
    const slow = updateContext();

    await updateContext();

    // The slow request answers with the state of before, which must not win.
    releaseFirst(response(false));
    await slow;
    await flush();

    expect(businessInContext()).toBe(true);
  });
});
