import {
  type EndpointObject,
  type FrontendEndpoint,
  type PdkEndpointDefinition,
  type PdkEndpointParameters,
  type PdkEndpointResponse,
  type Plugin,
} from '@myparcel-pdk/common';

export type FrontendPdkEndpointObject = EndpointObject<FrontendEndpoint>;

export type FrontendEndpointData<E extends FrontendEndpoint> = FrontendPdkEndpointObject[E] & {
  baseUrl: string;
};

export type FrontendEndpointResponse<E extends FrontendEndpoint> = PdkEndpointResponse<E, FrontendEndpointDefinition>;

export type FrontendEndpointParameters<E extends FrontendEndpoint> = PdkEndpointParameters<
  E,
  FrontendEndpointDefinition
>;

interface FetchCheckoutContextDefinition extends PdkEndpointDefinition {
  formattedResponse: Plugin.ModelContextCheckoutContext;
  name: FrontendEndpoint.FetchCheckoutContext;
  parameters: {
    shippingMethod?: string;
  };
  response: [Plugin.ModelContextCheckoutContext];
}

export type FrontendEndpointDefinition = FetchCheckoutContextDefinition;
