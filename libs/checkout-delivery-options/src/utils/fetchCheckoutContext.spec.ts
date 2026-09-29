/** @vitest-environment happy-dom */
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {tests, useCheckoutStore, usePdkCheckout} from '@myparcel-dev/pdk-checkout-common';
import {initializeCheckoutDeliveryOptions} from '../initializeCheckoutDeliveryOptions';
import {useDeliveryOptionsStore} from './useDeliveryOptionsStore';
import {updateContext} from './updateContext';

const weight = (value: number) => ({weight: value});

beforeEach(async () => {
  const context = tests.getMockCheckoutContext();
  context.config.physicalProperties = weight(30000);
  tests.getMockCheckoutContext.mockReturnValueOnce(context);
  tests.doRequestSpy.mockResolvedValue({data: {context: [{checkout: context}]}});
  await tests.mockPdkCheckout();
  usePdkCheckout().onInitialize(() => initializeCheckoutDeliveryOptions());

  await vi.waitFor(() => expect(useDeliveryOptionsStore().state.enabled).toBe(true));
});

describe('checkout context responses', () => {
  it.each([
    ['missing response', undefined],
    ['empty response', {}],
    ['empty context list', {data: {context: []}}],
    ['missing checkout', {data: {context: [{}]}}],
    ['empty checkout', {data: {context: [{checkout: {}}]}}],
    ['empty settings', {data: {context: [{checkout: {settings: {}}}]}}],
    ['null settings', {data: {context: [{checkout: {settings: null}}]}}],
  ])('preserves usable settings after %s and recovers on the next request', async (...[, response]) => {
    const checkout = useCheckoutStore();
    const {settings} = checkout.state.context;
    tests.doRequestSpy.mockResolvedValueOnce(response);

    await expect(updateContext()).rejects.toThrow('Invalid checkout context response');

    expect(checkout.state.context.settings).toBe(settings);
    expect(useDeliveryOptionsStore().state.configuration.config.physicalProperties).toBeNull();

    const context = tests.getMockCheckoutContext();
    context.config.physicalProperties = weight(15000);
    tests.doRequestSpy.mockResolvedValueOnce({data: {context: [{checkout: context}]}});
    await updateContext();
    expect(checkout.state.context.config.physicalProperties).toEqual(weight(15000));
  });

  it('rejects malformed shipping-method settings before replacing the context', async () => {
    const checkout = useCheckoutStore();
    const {settings} = checkout.state.context;
    const context = tests.getMockCheckoutContext();
    tests.doRequestSpy.mockResolvedValueOnce({
      data: {
        context: [
          {
            checkout: {
              ...context,
              settings: {...context.settings, allowedShippingMethods: {package: null}},
            },
          },
        ],
      },
    });

    await expect(updateContext()).rejects.toThrow('Invalid checkout context response');
    expect(checkout.state.context.settings).toBe(settings);
  });

  it.each([
    ['missing actions', {actions: undefined}],
    ['invalid action URL', {actions: {baseUrl: 12, endpoints: {}}}],
    ['missing endpoints', {actions: {baseUrl: '/checkout'}}],
    ['missing context endpoint', {actions: {baseUrl: '/checkout', endpoints: {}}}],
    ['missing shipping methods', {allowedShippingMethods: undefined}],
    ['invalid shipping methods', {allowedShippingMethods: 'package'}],
    ['invalid shipping method entry', {allowedShippingMethods: {package: ['standard', 12]}}],
  ])('rejects %s and preserves settings needed for recovery', async (...[, invalidSettings]) => {
    const checkout = useCheckoutStore();
    const {settings} = checkout.state.context;
    const context = tests.getMockCheckoutContext();
    tests.doRequestSpy.mockResolvedValueOnce({
      data: {context: [{checkout: {...context, settings: {...context.settings, ...invalidSettings}}}]},
    });

    await expect(updateContext()).rejects.toThrow('Invalid checkout context response');
    expect(checkout.state.context.settings).toBe(settings);
    expect(useDeliveryOptionsStore().state.configuration.config.physicalProperties).toBeNull();
  });
});
