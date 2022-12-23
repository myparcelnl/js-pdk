/* eslint-disable max-len,vue/max-len */
import {EndpointName} from '@myparcel-pdk/common';
import {FormInstance} from '@myparcel/vue-form-builder';
import {OneOrMore} from '@myparcel/ts-utils';
import {PdkEndpointDefinition} from '../sdk';

export type ActionParameters<A extends FrontendAction> = FrontendActionParameterMap[A];

export interface FrontendActionParameterMap extends Record<FrontendAction, Record<string, unknown>> {
  [FrontendAction.ORDER_EXPORT]: {orderIds: OneOrMore<string>; form?: FormInstance};
  [FrontendAction.ORDER_EXPORT_PRINT]: {orderIds: OneOrMore<string>; form?: FormInstance};
  [FrontendAction.ORDER_PRINT]: {orderIds: OneOrMore<string>; form?: FormInstance};
  [FrontendAction.ORDER_UPDATE]: {orderIds: OneOrMore<string>; form: FormInstance};

  [FrontendAction.SHIPMENTS_DELETE]: {orderIds?: OneOrMore<string>; shipmentIds?: OneOrMore<number>};
  [FrontendAction.SHIPMENTS_REFRESH]: {orderIds?: OneOrMore<string>; shipmentIds?: OneOrMore<number>};
  [FrontendAction.SHIPMENTS_PRINT]: {
    orderIds?: OneOrMore<string>;
    shipmentIds?: OneOrMore<number>;
    form?: FormInstance;
  };

  [FrontendAction.PLUGIN_SETTINGS_UPDATE]: {form: FormInstance};
  [FrontendAction.PRODUCT_SETTINGS_UPDATE]: {productIds: OneOrMore<string>; form: FormInstance};
}

export interface FrontendActionEndpointMap extends Record<FrontendAction, EndpointName> {
  [FrontendAction.ORDER_EXPORT]: EndpointName.EXPORT_ORDERS;
  [FrontendAction.ORDER_EXPORT_PRINT]: EndpointName.EXPORT_ORDERS;
  [FrontendAction.ORDER_PRINT]: EndpointName.PRINT_ORDERS;
  [FrontendAction.ORDER_UPDATE]: EndpointName.UPDATE_ORDERS;
  [FrontendAction.SHIPMENTS_DELETE]: EndpointName.DELETE_SHIPMENTS;
  [FrontendAction.SHIPMENTS_REFRESH]: EndpointName.REFRESH_SHIPMENTS;
  [FrontendAction.SHIPMENTS_PRINT]: EndpointName.PRINT_SHIPMENTS;
  [FrontendAction.PLUGIN_SETTINGS_UPDATE]: EndpointName.UPDATE_PLUGIN_SETTINGS;
  [FrontendAction.PRODUCT_SETTINGS_UPDATE]: EndpointName.UPDATE_PRODUCT_SETTINGS;
}

export type ActionResponse<A extends FrontendAction> = PdkEndpointDefinition<FrontendActionEndpointMap[A]>;

export enum FrontendAction {
  ORDER_EXPORT = 'ordersExport',
  ORDER_EXPORT_PRINT = 'ordersExportPrint',
  ORDER_PRINT = 'ordersPrint',
  ORDER_REFRESH = 'ordersRefresh',
  ORDER_UPDATE = 'ordersUpdate',

  SHIPMENTS_CREATE_RETURN = 'shipmentsReturn',
  SHIPMENTS_DELETE = 'shipmentsDelete',
  SHIPMENTS_PRINT = 'shipmentsPrint',
  SHIPMENTS_REFRESH = 'shipmentsRefresh',

  PLUGIN_SETTINGS_UPDATE = 'pluginSettingsUpdate',
  PRODUCT_SETTINGS_UPDATE = 'productSettingsUpdate',

  WEBHOOKS_CREATE = 'webhooksCreate',
  WEBHOOKS_DELETE = 'webhooksDelete',
  WEBHOOKS_REFRESH = 'webhooksRefresh',
}

export const formActions = [FrontendAction.PLUGIN_SETTINGS_UPDATE, FrontendAction.PRODUCT_SETTINGS_UPDATE];

export const printActions = [
  FrontendAction.SHIPMENTS_PRINT,
  FrontendAction.ORDER_EXPORT_PRINT,
  FrontendAction.ORDER_PRINT,
] as const;

export const updateOrderActions = [
  FrontendAction.ORDER_UPDATE,
  FrontendAction.ORDER_EXPORT,
  FrontendAction.ORDER_EXPORT_PRINT,
] as const;

export const updateShipmentActions = [
  FrontendAction.SHIPMENTS_DELETE,
  FrontendAction.SHIPMENTS_REFRESH,
  FrontendAction.ORDER_EXPORT,
  FrontendAction.ORDER_EXPORT_PRINT,
  FrontendAction.ORDER_REFRESH,
] as const;

export const actionEndpointMap: Partial<Record<FrontendAction, EndpointName>> = {
  [FrontendAction.ORDER_EXPORT]: EndpointName.EXPORT_ORDERS,
  [FrontendAction.ORDER_EXPORT_PRINT]: EndpointName.EXPORT_ORDERS,
  [FrontendAction.ORDER_PRINT]: EndpointName.PRINT_ORDERS,
  [FrontendAction.ORDER_UPDATE]: EndpointName.UPDATE_ORDERS,
  [FrontendAction.PLUGIN_SETTINGS_UPDATE]: EndpointName.UPDATE_PLUGIN_SETTINGS,
  [FrontendAction.PRODUCT_SETTINGS_UPDATE]: EndpointName.UPDATE_PRODUCT_SETTINGS,
  [FrontendAction.SHIPMENTS_DELETE]: EndpointName.DELETE_SHIPMENTS,
  [FrontendAction.SHIPMENTS_PRINT]: EndpointName.PRINT_SHIPMENTS,
  [FrontendAction.SHIPMENTS_REFRESH]: EndpointName.REFRESH_SHIPMENTS,
};
