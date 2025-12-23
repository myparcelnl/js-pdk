import {type EndpointDefinition} from '@myparcel-dev/sdk';
import {type Plugin} from './php-pdk.types';

export interface PdkEndpointDefinition extends EndpointDefinition {
  formattedResponse?: unknown;
}

export type ExtractEndpointDefinition<E extends string, D extends PdkEndpointDefinition> = Extract<
  D,
  {
    name: E;
  }
>;

export type PdkEndpointResponse<E extends string, D extends PdkEndpointDefinition> = ExtractEndpointDefinition<
  E,
  D
> extends {
  formattedResponse: infer R;
}
  ? R
  : ExtractEndpointDefinition<E, D>['response'];

export type PdkEndpointParameters<E extends string, D extends PdkEndpointDefinition> = ExtractEndpointDefinition<
  E,
  D
>['parameters'];

export type EndpointObject<E extends string> = Record<E, Plugin.AbstractEndpointRequest>;
