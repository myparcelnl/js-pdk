import {vi} from 'vitest';
import {type CheckoutAppContext} from '../types';
import {FrontendEndpoint} from '../data';

export const getMockCheckoutContext = vi.fn(
  (context?: Partial<CheckoutAppContext['checkout']>): CheckoutAppContext['checkout'] => {
    return {
      config: {
        ...context?.config,
      },
      settings: {
        hasDeliveryOptions: true,
        actions: {
          baseUrl: '',
          endpoints: {
            [FrontendEndpoint.FetchCheckoutContext]: {
              body: '',
              headers: {},
              method: 'GET',
              parameters: {},
              path: '',
              property: 'context',
              ...context?.settings?.actions?.endpoints?.[FrontendEndpoint.FetchCheckoutContext],
            },
          },
          ...context?.settings?.actions,
        },
        allowedShippingMethods: [],
        carriersWithTaxFields: [],
        countriesWithSeparateAddressFields: [],
        hiddenInputName: '',
        ...context?.settings,
      },
      strings: {
        ...context?.strings,
      },
      ...context,
    };
  },
);
