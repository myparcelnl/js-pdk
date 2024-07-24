import {BackendEndpoint} from '@myparcel-pdk/common';

export const BACKEND_ENDPOINTS_ORDERS = [
  BackendEndpoint.ExportOrders,
  BackendEndpoint.FetchOrders,
  BackendEndpoint.PrintOrders,
  BackendEndpoint.UpdateOrders,
] as const;

export const BACKEND_ENDPOINTS_SHIPMENTS = [
  BackendEndpoint.DeleteShipments,
  BackendEndpoint.ExportReturn,
  BackendEndpoint.FetchShipments,
  BackendEndpoint.PrintShipments,
  BackendEndpoint.UpdateShipments,
] as const;

export const BACKEND_ENDPOINTS_WEBHOOKS = [
  BackendEndpoint.CreateWebhooks,
  BackendEndpoint.DeleteWebhooks,
  BackendEndpoint.FetchWebhooks,
] as const;

export const BACKEND_ENDPOINTS_DEBUG = [BackendEndpoint.DebugDownloadLogs] as const;
