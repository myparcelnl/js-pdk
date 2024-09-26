import {vi} from 'vitest';
import {FrontendEndpoint, type Plugin} from '@myparcel-pdk/common';
import {KEY_CONFIG} from '@myparcel/delivery-options';
import {PackageTypeName} from '@myparcel/constants';
import {getMockDeliveryOptionsConfig} from './getMockDeliveryOptionsConfig';

export const getMockCheckoutContext = vi.fn(
  (context?: Partial<Plugin.ModelContextCheckoutContext>): Plugin.ModelContextCheckoutContext => {
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
        allowedShippingMethods: {
          '-1': ['standard', 'free_shipping'],
          [PackageTypeName.Package]: ['flat_rate:1'],
          [PackageTypeName.PackageSmall]: ['flat_rate:2'],
          [PackageTypeName.Mailbox]: ['flat_rate:3', 'flat_rate:4'],
          [PackageTypeName.DigitalStamp]: ['flat_rate:5'],
          [PackageTypeName.Letter]: ['flat_rate:6'],
        },
        carriersWithTaxFields: [],
        countriesWithSeparateAddressFields: [],
        hiddenInputName: '',
        ...context?.settings,
      },
      [KEY_CONFIG]: getMockDeliveryOptionsConfig(),
      ...context,
    } as Plugin.ModelContextCheckoutContext;
  },
);
