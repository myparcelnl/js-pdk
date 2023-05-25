import {EndpointDefinition} from '@myparcel/sdk';
import {BackendEndpoint, FrontendEndpoint, Plugin} from '..';

export type AnyEndpoint = FrontendEndpoint | BackendEndpoint;

export interface PdkEndpointDefinition extends EndpointDefinition {
  formattedResponse?: unknown;
}

export type ExtractEndpointDefinition<E extends AnyEndpoint, D extends PdkEndpointDefinition> = Extract<D, {name: E}>;

export type PdkEndpointResponse<E extends AnyEndpoint, D extends PdkEndpointDefinition> = ExtractEndpointDefinition<
  E,
  D
> extends {
  formattedResponse: infer R;
}
  ? R
  : ExtractEndpointDefinition<E, D>['response'];

export type PdkEndpointParameters<E extends AnyEndpoint, D extends PdkEndpointDefinition> = ExtractEndpointDefinition<
  E,
  D
>['parameters'];

export type EndpointObject<T extends AnyEndpoint> = Record<T, Plugin.AbstractEndpointRequest>;

export type BackendPdkEndpointObject = EndpointObject<BackendEndpoint>;

export type FrontendPdkEndpointObject = EndpointObject<FrontendEndpoint>;
