import {HttpMethod} from '@myparcel/sdk';
import {Pdk} from './php-pdk.types';

type Parameters = Record<string, string> & {action: EndpointName};

export interface AbstractRequest {
  body: string;
  headers: Record<string, string>;
  httpMethod: HttpMethod;
  parameters: Parameters;
  path: string;
  queryString: string;
}

export type EndpointName = 'getOrderData' | 'exportOrder' | 'exportPrintOrder';

export type EndpointResponse<N extends EndpointName> = N extends 'getOrderData'
  ? {response: Pdk.PluginModelContextOrderDataContext[]}
  : N extends 'exportOrder'
  ? {body: Pdk.PluginModelContextOrderDataContext; response: Pdk.PluginModelContextOrderDataContext[]}
  : N extends 'exportPrintOrder'
  ? {body: Pdk.PluginModelContextOrderDataContext; response: Pdk.PluginModelContextOrderDataContext[]}
  : never;

export type EndpointMap = {
  [k in EndpointName]: AbstractRequest;
};
