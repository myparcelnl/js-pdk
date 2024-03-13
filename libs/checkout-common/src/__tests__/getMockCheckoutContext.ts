import {vi} from 'vitest';
import {FrontendEndpoint} from '@myparcel-pdk/common';
import {type CheckoutAppCheckoutContext} from '../types';

export const getMockCheckoutContext = vi.fn(
  (context?: Partial<CheckoutAppCheckoutContext>): CheckoutAppCheckoutContext => {
    return {
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
      ...context,
    } as CheckoutAppCheckoutContext;
  },
);
