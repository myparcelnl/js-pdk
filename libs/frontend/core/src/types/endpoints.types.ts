import {EndpointName} from '@myparcel-pdk/common';
import {FormInstance} from '@myparcel/vue-form-builder';
import {FrontendAction} from './actions.types';
import {OneOrMore} from '@myparcel/ts-utils';
import {PdkEndpointDefinition} from '../sdk';

export type EndpointResponse<N extends EndpointName> = PdkEndpointDefinition<N>['formattedResponse'] extends Record<
  string,
  unknown
>
  ? PdkEndpointDefinition<N>['formattedResponse']
  : PdkEndpointDefinition<N>['response'];

export type EndpointParameters<N extends EndpointName> = PdkEndpointDefinition<N>['parameters'];

export interface FrontendActionEndpointMap extends Record<FrontendAction, EndpointName> {
  [FrontendAction.ACCOUNT_FETCH]: EndpointName.FETCH_ACCOUNT;
  [FrontendAction.ACCOUNT_UPDATE]: EndpointName.UPDATE_ACCOUNT;
  [FrontendAction.ORDERS_EXPORT]: EndpointName.EXPORT_ORDERS;
  [FrontendAction.ORDERS_EXPORT_PRINT]: EndpointName.EXPORT_ORDERS;
  [FrontendAction.ORDERS_FETCH]: EndpointName.FETCH_ORDERS;
  [FrontendAction.ORDERS_PRINT]: EndpointName.PRINT_ORDERS;
  [FrontendAction.ORDERS_UPDATE]: EndpointName.UPDATE_ORDERS;
  [FrontendAction.PLUGIN_SETTINGS_UPDATE]: EndpointName.UPDATE_PLUGIN_SETTINGS;
  [FrontendAction.PRODUCT_SETTINGS_UPDATE]: EndpointName.UPDATE_PRODUCT_SETTINGS;
  [FrontendAction.SHIPMENTS_CREATE_RETURN]: EndpointName.CREATE_RETURN_SHIPMENTS;
  [FrontendAction.SHIPMENTS_DELETE]: EndpointName.DELETE_SHIPMENTS;
  [FrontendAction.SHIPMENTS_FETCH]: EndpointName.FETCH_SHIPMENTS;
  [FrontendAction.SHIPMENTS_PRINT]: EndpointName.PRINT_SHIPMENTS;
  [FrontendAction.WEBHOOKS_CREATE]: EndpointName.CREATE_WEBHOOKS;
  [FrontendAction.WEBHOOKS_DELETE]: EndpointName.DELETE_WEBHOOKS;
  [FrontendAction.WEBHOOKS_FETCH]: EndpointName.FETCH_WEBHOOKS;
}

export type EndpointFrontendActionMap = {
  [K in EndpointName]: FrontendActionEndpointMap[keyof FrontendActionEndpointMap] extends K
    ? FrontendActionEndpointMap[keyof FrontendActionEndpointMap]
    : never;
};

export interface EndpointMutationInputMap extends Record<EndpointName, Record<string, unknown>> {
  [EndpointName.FETCH_ACCOUNT]: never;
  [EndpointName.UPDATE_ACCOUNT]: {form: FormInstance};

  [EndpointName.EXPORT_ORDERS]: {orderIds: OneOrMore<string>; form?: FormInstance};
  [EndpointName.FETCH_ORDERS]: {orderIds: OneOrMore<string>};
  [EndpointName.PRINT_ORDERS]: {orderIds: OneOrMore<string>; form?: FormInstance};
  [EndpointName.UPDATE_ORDERS]: {orderIds: OneOrMore<string>; form: FormInstance};

  [EndpointName.CREATE_RETURN_SHIPMENTS]: {orderIds: OneOrMore<string>; shipmentIds: OneOrMore<number>};
  [EndpointName.DELETE_SHIPMENTS]: {orderIds: OneOrMore<string>; shipmentIds: OneOrMore<number>};
  [EndpointName.FETCH_SHIPMENTS]: {orderIds: OneOrMore<string>; shipmentIds?: OneOrMore<number>};
  [EndpointName.PRINT_SHIPMENTS]: {orderIds: OneOrMore<string>; shipmentIds: OneOrMore<number>; form?: FormInstance};

  [EndpointName.UPDATE_PLUGIN_SETTINGS]: {form: FormInstance};
  [EndpointName.UPDATE_PRODUCT_SETTINGS]: {form: FormInstance; productIds: OneOrMore<string>};

  [EndpointName.CREATE_WEBHOOKS]: {hooks: OneOrMore<string>};
  [EndpointName.DELETE_WEBHOOKS]: {hooks: OneOrMore<string>};
  [EndpointName.FETCH_WEBHOOKS]: never;
}

export type ActionInput<A extends EndpointName> = EndpointMutationInputMap[A];
