import {AdminAction} from './actions.types';
import {AdminContextKey} from './context.types';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {FormInstance} from '@myparcel/vue-form-builder/src';
import {OneOrMore} from '@myparcel/ts-utils';
import {PdkEndpointDefinition} from '../sdk';

export type EndpointResponse<N extends BackendEndpoint> = PdkEndpointDefinition<N>['formattedResponse'] extends Record<
  string,
  unknown
>
  ? PdkEndpointDefinition<N>['formattedResponse']
  : PdkEndpointDefinition<N>['response'];

export type EndpointParameters<N extends BackendEndpoint> = PdkEndpointDefinition<N>['parameters'];

export interface AdminActionEndpointMap extends Record<AdminAction, BackendEndpoint> {
  [AdminAction.CONTEXT_FETCH]: BackendEndpoint.FETCH_CONTEXT;
  [AdminAction.ACCOUNT_UPDATE]: BackendEndpoint.UPDATE_ACCOUNT;
  [AdminAction.ORDERS_EXPORT]: BackendEndpoint.EXPORT_ORDERS;
  [AdminAction.ORDERS_EXPORT_PRINT]: BackendEndpoint.EXPORT_ORDERS;
  [AdminAction.ORDERS_FETCH]: BackendEndpoint.FETCH_ORDERS;
  [AdminAction.ORDERS_PRINT]: BackendEndpoint.PRINT_ORDERS;
  [AdminAction.ORDERS_UPDATE]: BackendEndpoint.UPDATE_ORDERS;
  [AdminAction.PLUGIN_SETTINGS_UPDATE]: BackendEndpoint.UPDATE_PLUGIN_SETTINGS;
  [AdminAction.PRODUCT_SETTINGS_UPDATE]: BackendEndpoint.UPDATE_PRODUCT_SETTINGS;
  [AdminAction.SHIPMENTS_CREATE_RETURN]: BackendEndpoint.CREATE_RETURN_SHIPMENTS;
  [AdminAction.SHIPMENTS_DELETE]: BackendEndpoint.DELETE_SHIPMENTS;
  [AdminAction.SHIPMENTS_FETCH]: BackendEndpoint.FETCH_SHIPMENTS;
  [AdminAction.SHIPMENTS_PRINT]: BackendEndpoint.PRINT_SHIPMENTS;
  [AdminAction.WEBHOOKS_CREATE]: BackendEndpoint.CREATE_WEBHOOKS;
  [AdminAction.WEBHOOKS_DELETE]: BackendEndpoint.DELETE_WEBHOOKS;
  [AdminAction.WEBHOOKS_FETCH]: BackendEndpoint.FETCH_WEBHOOKS;
}

export type EndpointAdminActionMap = {
  [K in BackendEndpoint]: AdminActionEndpointMap[keyof AdminActionEndpointMap] extends K
    ? AdminActionEndpointMap[keyof AdminActionEndpointMap]
    : never;
};

export interface EndpointMutationInputMap extends Record<BackendEndpoint, Record<string, unknown>> {
  [BackendEndpoint.FETCH_CONTEXT]: {contexts?: OneOrMore<AdminContextKey>};

  [BackendEndpoint.UPDATE_ACCOUNT]: {form: FormInstance};

  [BackendEndpoint.EXPORT_ORDERS]: {orderIds: OneOrMore<string>; form?: FormInstance};
  [BackendEndpoint.FETCH_ORDERS]: {orderIds: OneOrMore<string>};
  [BackendEndpoint.PRINT_ORDERS]: {orderIds: OneOrMore<string>; form?: FormInstance};
  [BackendEndpoint.UPDATE_ORDERS]: {orderIds: OneOrMore<string>; form: FormInstance};

  [BackendEndpoint.CREATE_RETURN_SHIPMENTS]: {orderIds: OneOrMore<string>; shipmentIds: OneOrMore<number>};
  [BackendEndpoint.DELETE_SHIPMENTS]: {orderIds: OneOrMore<string>; shipmentIds: OneOrMore<number>};
  [BackendEndpoint.FETCH_SHIPMENTS]: {orderIds: OneOrMore<string>; shipmentIds?: OneOrMore<number>};
  [BackendEndpoint.PRINT_SHIPMENTS]: {orderIds: OneOrMore<string>; shipmentIds: OneOrMore<number>; form?: FormInstance};

  [BackendEndpoint.UPDATE_PLUGIN_SETTINGS]: {form: FormInstance};
  [BackendEndpoint.UPDATE_PRODUCT_SETTINGS]: {form: FormInstance; productIds: OneOrMore<string>};

  [BackendEndpoint.CREATE_WEBHOOKS]: {hooks: OneOrMore<string>};
  [BackendEndpoint.DELETE_WEBHOOKS]: {hooks: OneOrMore<string>};
  [BackendEndpoint.FETCH_WEBHOOKS]: never;
}

export type ActionInput<A extends BackendEndpoint> = EndpointMutationInputMap[A];
