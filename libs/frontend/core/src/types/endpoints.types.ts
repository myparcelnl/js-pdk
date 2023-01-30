import {EndpointName} from '@myparcel-pdk/common';
import {FormInstance} from '@myparcel/vue-form-builder';
import {FrontendAction} from './actions.types';
import {OneOrMore} from '@myparcel/ts-utils';
import {PdkEndpointDefinition} from '../sdk';

export type EndpointResponse<N extends EndpointName> = PdkEndpointDefinition<N>['formattedResponse'] extends undefined
  ? PdkEndpointDefinition<N>['response']
  : PdkEndpointDefinition<N>['formattedResponse'];

export type EndpointParameters<N extends EndpointName> = PdkEndpointDefinition<N>['parameters'];

export interface FrontendActionEndpointMap extends Record<FrontendAction, EndpointName> {
  [FrontendAction.ORDERS_EXPORT]: EndpointName.EXPORT_ORDERS;
  [FrontendAction.ORDERS_EXPORT_PRINT]: EndpointName.EXPORT_ORDERS;
  [FrontendAction.ORDERS_FETCH]: EndpointName.FETCH_ORDERS;
  [FrontendAction.ORDERS_PRINT]: EndpointName.PRINT_ORDERS;
  [FrontendAction.ORDERS_UPDATE]: EndpointName.UPDATE_ORDERS;
  [FrontendAction.PLUGIN_SETTINGS_UPDATE]: EndpointName.UPDATE_PLUGIN_SETTINGS;
  [FrontendAction.PRODUCT_SETTINGS_UPDATE]: EndpointName.UPDATE_PRODUCT_SETTINGS;
  [FrontendAction.SHIPMENTS_DELETE]: EndpointName.DELETE_SHIPMENTS;
  [FrontendAction.SHIPMENTS_FETCH]: EndpointName.FETCH_SHIPMENTS;
  [FrontendAction.SHIPMENTS_PRINT]: EndpointName.PRINT_SHIPMENTS;
}

export interface EndpointMutationInputMap extends Record<EndpointName, Record<string, unknown>> {
  [EndpointName.DELETE_SHIPMENTS]: {orderIds: OneOrMore<string>; shipmentIds: OneOrMore<number>};
  [EndpointName.EXPORT_ORDERS]: {orderIds: OneOrMore<string>; form?: FormInstance};
  [EndpointName.FETCH_ORDERS]: {orderIds: OneOrMore<string>};
  [EndpointName.FETCH_SHIPMENTS]: {orderIds: OneOrMore<string>; shipmentIds: OneOrMore<number>};
  [EndpointName.PRINT_ORDERS]: {orderIds: OneOrMore<string>; form?: FormInstance};
  [EndpointName.PRINT_SHIPMENTS]: {orderIds: OneOrMore<string>; shipmentIds: OneOrMore<number>; form?: FormInstance};
  [EndpointName.UPDATE_ORDERS]: {orderIds: OneOrMore<string>; form: FormInstance};
  [EndpointName.UPDATE_PLUGIN_SETTINGS]: {form: FormInstance};
  [EndpointName.UPDATE_PRODUCT_SETTINGS]: {form: FormInstance; productIds: OneOrMore<string>};
}

export type ActionInput<A extends EndpointName> = EndpointMutationInputMap[A];
