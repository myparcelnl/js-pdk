import {AdminAction} from './actions.types';
import {ContextKey} from './context.types';
import {EndpointName} from '@myparcel-pdk/common/src';
import {FormInstance} from '@myparcel/vue-form-builder/src';
import {OneOrMore} from '@myparcel/ts-utils';
import {PdkEndpointDefinition} from '../sdk';

export type EndpointResponse<N extends EndpointName> = PdkEndpointDefinition<N>['formattedResponse'] extends Record<
  string,
  unknown
>
  ? PdkEndpointDefinition<N>['formattedResponse']
  : PdkEndpointDefinition<N>['response'];

export type EndpointParameters<N extends EndpointName> = PdkEndpointDefinition<N>['parameters'];

export interface AdminActionEndpointMap extends Record<AdminAction, EndpointName> {
  [AdminAction.CONTEXT_FETCH]: EndpointName.FETCH_CONTEXT;
  [AdminAction.ACCOUNT_UPDATE]: EndpointName.UPDATE_ACCOUNT;
  [AdminAction.ORDERS_EXPORT]: EndpointName.EXPORT_ORDERS;
  [AdminAction.ORDERS_EXPORT_PRINT]: EndpointName.EXPORT_ORDERS;
  [AdminAction.ORDERS_FETCH]: EndpointName.FETCH_ORDERS;
  [AdminAction.ORDERS_PRINT]: EndpointName.PRINT_ORDERS;
  [AdminAction.ORDERS_UPDATE]: EndpointName.UPDATE_ORDERS;
  [AdminAction.PLUGIN_SETTINGS_UPDATE]: EndpointName.UPDATE_PLUGIN_SETTINGS;
  [AdminAction.PRODUCT_SETTINGS_UPDATE]: EndpointName.UPDATE_PRODUCT_SETTINGS;
  [AdminAction.SHIPMENTS_CREATE_RETURN]: EndpointName.CREATE_RETURN_SHIPMENTS;
  [AdminAction.SHIPMENTS_DELETE]: EndpointName.DELETE_SHIPMENTS;
  [AdminAction.SHIPMENTS_FETCH]: EndpointName.FETCH_SHIPMENTS;
  [AdminAction.SHIPMENTS_PRINT]: EndpointName.PRINT_SHIPMENTS;
  [AdminAction.WEBHOOKS_CREATE]: EndpointName.CREATE_WEBHOOKS;
  [AdminAction.WEBHOOKS_DELETE]: EndpointName.DELETE_WEBHOOKS;
  [AdminAction.WEBHOOKS_FETCH]: EndpointName.FETCH_WEBHOOKS;
}

export type EndpointAdminActionMap = {
  [K in EndpointName]: AdminActionEndpointMap[keyof AdminActionEndpointMap] extends K
    ? AdminActionEndpointMap[keyof AdminActionEndpointMap]
    : never;
};

export interface EndpointMutationInputMap extends Record<EndpointName, Record<string, unknown>> {
  [EndpointName.FETCH_CONTEXT]: {contexts?: OneOrMore<ContextKey>};

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
