/** @vitest-environment happy-dom */
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {tests, useCheckoutStore, usePdkCheckout} from '@myparcel-dev/pdk-checkout-common';
import {initializeCheckoutDeliveryOptions} from '../initializeCheckoutDeliveryOptions';
import {useDeliveryOptionsStore} from './useDeliveryOptionsStore';
import {updateContext} from './updateContext';
import {fetchCheckoutContext} from './fetchCheckoutContext';

const weight = (grams: number) => ({weight: grams});

/** A response of the FetchCheckoutContext endpoint that holds the given checkout context. */
const responseWith = (checkout: unknown) => ({data: {context: [{checkout}]}});

/** A complete checkout context from the mock PDK, with some of its settings replaced. */
const contextWithSettings = (settings: Record<string, unknown>) => {
  const context = tests.getMockCheckoutContext();

  return {...context, settings: {...context.settings, ...settings}};
};

beforeEach(async () => {
  const context = tests.getMockCheckoutContext();
  context.config.physicalProperties = weight(30000);
  tests.getMockCheckoutContext.mockReturnValueOnce(context);
  tests.doRequestSpy.mockResolvedValue(responseWith(context));
  await tests.mockPdkCheckout();
  usePdkCheckout().onInitialize(() => initializeCheckoutDeliveryOptions());

  await vi.waitFor(() => expect(useDeliveryOptionsStore().state.enabled).toBe(true));
});

describe('fetchCheckoutContext', () => {
  it('returns the checkout context of the response', async () => {
    const context = tests.getMockCheckoutContext();
    tests.doRequestSpy.mockResolvedValueOnce(responseWith(context));

    await expect(fetchCheckoutContext()).resolves.toEqual(context);
  });

  it.each([
    ['no response', undefined],
    ['an empty response', {}],
    ['an empty context list', {data: {context: []}}],
    ['no checkout context', {data: {context: [{}]}}],
    ['an empty checkout context', responseWith({})],
    ['empty settings', responseWith({settings: {}})],
    ['null settings', responseWith({settings: null})],
    ['no actions', responseWith(contextWithSettings({actions: undefined}))],
    ['a base URL that is not a string', responseWith(contextWithSettings({actions: {baseUrl: 12, endpoints: {}}}))],
    ['no endpoints', responseWith(contextWithSettings({actions: {baseUrl: '/checkout'}}))],
    [
      'no endpoint to fetch the checkout context',
      responseWith(contextWithSettings({actions: {baseUrl: '/checkout', endpoints: {}}})),
    ],
    ['no allowed shipping methods', responseWith(contextWithSettings({allowedShippingMethods: undefined}))],
    [
      'allowed shipping methods that are not an object',
      responseWith(contextWithSettings({allowedShippingMethods: 'package'})),
    ],
    [
      'a package type without a list of shipping methods',
      responseWith(contextWithSettings({allowedShippingMethods: {package: null}})),
    ],
  ])('throws for a response with %s', async (...[, response]) => {
    tests.doRequestSpy.mockResolvedValueOnce(response);

    await expect(fetchCheckoutContext()).rejects.toThrow('Invalid checkout context response');
  });
});

describe('updateContext after a response without usable settings', () => {
  it.each([
    ['empty settings', responseWith({settings: {}})],
    [
      'no endpoint to fetch the checkout context',
      responseWith(contextWithSettings({actions: {baseUrl: '/checkout', endpoints: {}}})),
    ],
  ])('keeps the current settings after %s and uses them for the next request', async (...[, response]) => {
    const checkout = useCheckoutStore();
    const {settings} = checkout.state.context;
    tests.doRequestSpy.mockResolvedValueOnce(response);

    await expect(updateContext()).rejects.toThrow('Invalid checkout context response');

    expect(checkout.state.context.settings).toBe(settings);
    // The failed request cannot confirm the cart weight, so the widget no longer gets one.
    expect(useDeliveryOptionsStore().state.configuration.config.physicalProperties).toBeNull();

    const context = tests.getMockCheckoutContext();
    context.config.physicalProperties = weight(15000);
    tests.doRequestSpy.mockResolvedValueOnce(responseWith(context));
    await updateContext();

    expect(checkout.state.context.config.physicalProperties).toEqual(weight(15000));
  });
});
