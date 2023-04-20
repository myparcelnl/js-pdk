/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointObject, FrontendEndpoint} from '@myparcel-pdk/common';
import {Util, useUtil} from '../index';
import {FrontendSettings} from '../checkout.types';

export const createSettingsStore = () => {
  const createStore = useUtil(Util.CreateStore);

  return createStore<FrontendSettings>(Symbol('settings'), () => {
    return {
      state: {
        actions: {
          baseUrl: '',
          endpoints: {} as EndpointObject<FrontendEndpoint>,
        },
        allowedShippingMethods: [],
        carriersWithTaxFields: [],
        disallowedShippingMethods: [],
        hasDeliveryOptions: false,
        hiddenInputName: '',
        separateAddressFieldsCountries: [],
        separateAddressFieldsEnabled: false,
      },
    };
  })();
};
