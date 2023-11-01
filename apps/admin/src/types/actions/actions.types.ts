import {type ReverseMap} from '@myparcel/ts-utils';
import {type BackendEndpoint} from '../../data';

export enum AdminAction {
  ContextFetch = 'contextFetch',

  AccountDelete = 'accountDelete',
  AccountUpdate = 'accountUpdate',

  OrdersExport = 'ordersExport',
  OrdersExportPrint = 'ordersExportPrint',
  OrdersPrint = 'ordersPrint',
  OrdersFetch = 'ordersFetch',
  OrdersUpdate = 'ordersUpdate',
  OrdersEdit = 'ordersEdit',

  ShipmentsDelete = 'shipmentsDelete',
  ShipmentsPrint = 'shipmentsPrint',
  ShipmentsUpdate = 'shipmentsUpdate',
  ShipmentsFetch = 'shipmentsFetch',
  ShipmentsExportReturn = 'shipmentsExportReturn',

  PluginSettingsUpdate = 'pluginSettingsUpdate',
  ProductSettingsUpdate = 'productSettingsUpdate',

  WebhooksCreate = 'webhooksCreate',
  WebhooksDelete = 'webhooksDelete',
  WebhooksFetch = 'webhooksFetch',
}

export type MaybeAdminAction = AdminAction | undefined;

export type PrintAction = AdminAction.ShipmentsPrint | AdminAction.OrdersPrint;

export type OrderAction =
  | AdminAction.OrdersEdit
  | AdminAction.OrdersExport
  | AdminAction.OrdersExportPrint
  | AdminAction.OrdersFetch
  | AdminAction.OrdersPrint
  | AdminAction.OrdersUpdate;

export interface AdminActionEndpointMap extends Record<AdminAction, BackendEndpoint> {
  [AdminAction.AccountDelete]: BackendEndpoint.DeleteAccount;
  [AdminAction.AccountUpdate]: BackendEndpoint.UpdateAccount;
  [AdminAction.ContextFetch]: BackendEndpoint.FetchContext;
  [AdminAction.OrdersEdit]: BackendEndpoint.UpdateOrders;
  [AdminAction.OrdersExportPrint]: BackendEndpoint.ExportOrders;
  [AdminAction.OrdersExport]: BackendEndpoint.ExportOrders;
  [AdminAction.OrdersFetch]: BackendEndpoint.FetchOrders;
  [AdminAction.OrdersPrint]: BackendEndpoint.PrintOrders;
  [AdminAction.OrdersUpdate]: BackendEndpoint.UpdateOrders;
  [AdminAction.PluginSettingsUpdate]: BackendEndpoint.UpdatePluginSettings;
  [AdminAction.ProductSettingsUpdate]: BackendEndpoint.UpdateProductSettings;
  [AdminAction.ShipmentsDelete]: BackendEndpoint.DeleteShipments;
  [AdminAction.ShipmentsExportReturn]: BackendEndpoint.ExportReturn;
  [AdminAction.ShipmentsFetch]: BackendEndpoint.FetchShipments;
  [AdminAction.ShipmentsPrint]: BackendEndpoint.PrintShipments;
  [AdminAction.ShipmentsUpdate]: BackendEndpoint.UpdateShipments;
  [AdminAction.WebhooksCreate]: BackendEndpoint.CreateWebhooks;
  [AdminAction.WebhooksDelete]: BackendEndpoint.DeleteWebhooks;
  [AdminAction.WebhooksFetch]: BackendEndpoint.FetchWebhooks;
}

export type EndpointAdminActionMap = ReverseMap<AdminActionEndpointMap>;
