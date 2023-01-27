/* eslint-disable max-len,vue/max-len */
import {EndpointName} from '@myparcel-pdk/common';
import {FormInstance} from '@myparcel/vue-form-builder';
import {OneOrMore} from '@myparcel/ts-utils';
import {PdkEndpointDefinition} from '../sdk';

export type ActionParameters<A extends FrontendAction | undefined> = A extends FrontendAction
  ? FrontendActionParameterMap[A]
  : Record<string, unknown>;

export type ActionResponse<A extends FrontendAction | undefined> = A extends FrontendAction
  ? PdkEndpointDefinition<FrontendActionEndpointMap[A]>
  : void;

export interface FrontendActionParameterMap extends Record<FrontendAction, Record<string, unknown>> {
  [FrontendAction.ORDERS_EXPORT]: {orderIds: OneOrMore<string>; form?: FormInstance};
  [FrontendAction.ORDERS_EXPORT_PRINT]: {orderIds: OneOrMore<string>; form?: FormInstance};
  [FrontendAction.ORDERS_PRINT]: {orderIds: OneOrMore<string>; form?: FormInstance};
  [FrontendAction.ORDERS_UPDATE]: {orderIds: OneOrMore<string>; form: FormInstance};

  [FrontendAction.SHIPMENTS_DELETE]: {orderIds: OneOrMore<string>; shipmentIds?: OneOrMore<number>};
  [FrontendAction.SHIPMENTS_FETCH]: {orderIds: OneOrMore<string>; shipmentIds?: OneOrMore<number>};
  [FrontendAction.SHIPMENTS_PRINT]: {
    orderIds: OneOrMore<string>;
    shipmentIds?: OneOrMore<number>;
    form?: FormInstance;
  };

  [FrontendAction.PLUGIN_SETTINGS_UPDATE]: {form: FormInstance};
  [FrontendAction.PRODUCT_SETTINGS_UPDATE]: {productIds: OneOrMore<string>; form: FormInstance};
}

export interface FrontendActionEndpointMap extends Record<FrontendAction, EndpointName> {
  [FrontendAction.ORDERS_EXPORT]: EndpointName.EXPORT_ORDERS;
  [FrontendAction.ORDERS_EXPORT_PRINT]: EndpointName.EXPORT_ORDERS;
  [FrontendAction.ORDERS_PRINT]: EndpointName.PRINT_ORDERS;
  [FrontendAction.ORDERS_UPDATE]: EndpointName.UPDATE_ORDERS;
  [FrontendAction.SHIPMENTS_DELETE]: EndpointName.DELETE_SHIPMENTS;
  [FrontendAction.SHIPMENTS_FETCH]: EndpointName.FETCH_SHIPMENTS;
  [FrontendAction.SHIPMENTS_PRINT]: EndpointName.PRINT_SHIPMENTS;
  [FrontendAction.PLUGIN_SETTINGS_UPDATE]: EndpointName.UPDATE_PLUGIN_SETTINGS;
  [FrontendAction.PRODUCT_SETTINGS_UPDATE]: EndpointName.UPDATE_PRODUCT_SETTINGS;
}

export enum FrontendAction {
  ORDERS_EXPORT = 'ordersExport',
  ORDERS_EXPORT_PRINT = 'ordersExportPrint',
  ORDERS_PRINT = 'ordersPrint',
  ORDERS_FETCH = 'ordersFetch',
  ORDERS_UPDATE = 'ordersUpdate',

  SHIPMENTS_CREATE_RETURN = 'shipmentsReturn',
  SHIPMENTS_DELETE = 'shipmentsDelete',
  SHIPMENTS_PRINT = 'shipmentsPrint',
  SHIPMENTS_FETCH = 'shipmentsFetch',

  PLUGIN_SETTINGS_UPDATE = 'pluginSettingsUpdate',
  PRODUCT_SETTINGS_UPDATE = 'productSettingsUpdate',

  WEBHOOKS_CREATE = 'webhooksCreate',
  WEBHOOKS_DELETE = 'webhooksDelete',
  WEBHOOKS_REFRESH = 'webhooksRefresh',
}

export type PrintAction =
  | FrontendAction.SHIPMENTS_PRINT
  | FrontendAction.ORDERS_PRINT
  | FrontendAction.ORDERS_EXPORT_PRINT;

export type UpdateOrderAction =
  | FrontendAction.ORDERS_UPDATE
  | FrontendAction.ORDERS_EXPORT
  | FrontendAction.ORDERS_EXPORT_PRINT;

export type UpdateShipmentAction =
  | FrontendAction.SHIPMENTS_DELETE
  | FrontendAction.SHIPMENTS_FETCH
  | FrontendAction.ORDERS_EXPORT
  | FrontendAction.ORDERS_EXPORT_PRINT
  | FrontendAction.ORDERS_FETCH;
