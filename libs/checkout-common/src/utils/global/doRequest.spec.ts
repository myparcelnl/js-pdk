import {beforeEach, describe, expect, it} from 'vitest';
import {FrontendEndpoint} from '@myparcel-pdk/common';
import {doRequestSpy} from '../../__tests__/spies';
import {mockPdkCheckout} from '../../__tests__/mockPdkCheckout';
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
