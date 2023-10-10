import {beforeEach, describe, expect, it} from 'vitest';
import {FrontendEndpoint} from '@myparcel-pdk/checkout-common';
import {doRequestSpy, mockPdkCheckout} from '../../__tests__';
import {doRequest} from './doRequest';

describe('doRequest', () => {
  beforeEach(async () => {
    await mockPdkCheckout();
  });

  it('should call doRequest', async () => {
    expect.assertions(1);

    await doRequest(FrontendEndpoint.FetchCheckoutContext, {shippingMethod: 'shipping-method'});

    expect(doRequestSpy).toHaveBeenCalled();
  });
});
