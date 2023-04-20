/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {CheckoutSettings, Util, useUtil} from '../index';
import {EndpointObject, FrontendEndpoint} from '@myparcel-pdk/common';

export const createSettingsStore = () => {
  const createStore = useUtil(Util.CreateStore);

  return createStore<CheckoutSettings>(Symbol('settings'), () => {
    return {
      state: {
        actions: {
          baseUrl: '',
          endpoints: {} as EndpointObject<FrontendEndpoint>,
        },
        allowedShippingMethods: [],
        carriersWithTaxFields: [],
        countriesWithSeparateAddressFields: [],
        disallowedShippingMethods: [],
        hasDeliveryOptions: false,
        hiddenInputName: '',
      },
    };
  })();
};
