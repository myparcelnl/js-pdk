import type {HttpMethod} from '@myparcel/sdk';
import {MyParcelPdk} from './php-pdk.types';

type parameters = Record<string, string> & {action: EndpointName};

export interface AbstractRequest {
  body: string;
  headers: Record<string, string>;
  httpMethod: HttpMethod;
  parameters: parameters;
  path: string;
  queryString: string;
}

export type EndpointName = 'getOrderData' | 'exportOrder' | 'exportPrintOrder';

export type EndpointResponse<N extends EndpointName> = N extends 'getOrderData'
  ? {response: MyParcelPdk.OrderDataContext[]}
  : N extends 'exportOrder'
  ? {body: MyParcelPdk.OrderDataContext; response: MyParcelPdk.OrderDataContext[]}
  : N extends 'exportPrintOrder'
  ? {body: MyParcelPdk.OrderDataContext; response: MyParcelPdk.OrderDataContext[]}
  : never;

export type EndpointMap = {
  [k in EndpointName]: AbstractRequest;
};
