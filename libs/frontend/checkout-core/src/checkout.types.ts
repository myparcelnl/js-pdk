import {FrontendPdkEndpointObject} from '@myparcel-pdk/common';

export type FrontendSettings = {
  actions: {
    baseUrl: string;
    endpoints: FrontendPdkEndpointObject;
  };
  allowedShippingMethods: string[];
  carriersWithTaxFields: string[];
  hasDeliveryOptions: boolean;
  hiddenInputName: string;
  separateAddressFieldsCountries: string[];
  separateAddressFieldsEnabled: boolean;
};
