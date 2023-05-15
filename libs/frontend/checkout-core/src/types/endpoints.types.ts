import {
  FrontendEndpoint,
  PdkEndpointDefinition,
  PdkEndpointParameters,
  PdkEndpointResponse,
  Plugin,
} from '@myparcel-pdk/common/src';

export type FrontendEndpointResponse<E extends FrontendEndpoint> = PdkEndpointResponse<E, FrontendEndpointDefinition>;

export type FrontendEndpointParameters<E extends FrontendEndpoint> = PdkEndpointParameters<
  E,
  FrontendEndpointDefinition
>;

export type FrontendContextObject = {checkout: Plugin.ModelContextCheckoutContext};

interface FetchCheckoutContextDefinition extends PdkEndpointDefinition {
  formattedResponse: Plugin.ModelContextCheckoutContext;
  name: FrontendEndpoint.FetchCheckoutContext;
  parameters: {
    shippingMethod?: string;
  };
  response: [Plugin.ModelContextCheckoutContext];
}

export type FrontendEndpointDefinition = FetchCheckoutContextDefinition;