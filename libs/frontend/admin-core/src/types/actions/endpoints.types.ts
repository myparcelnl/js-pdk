import {type BackendEndpoint} from '@myparcel-pdk/common';

/**
 * All backend endpoints that are mutations.
 */
export type BackendMutationEndpoints =
  | BackendEndpoint.CreateWebhooks
  | BackendEndpoint.DeleteAccount
  | BackendEndpoint.DeleteShipments
  | BackendEndpoint.DeleteWebhooks
  | BackendEndpoint.ExportOrders
  | BackendEndpoint.ExportReturn
  | BackendEndpoint.PrintOrders
  | BackendEndpoint.PrintShipments
  | BackendEndpoint.UpdateAccount
  | BackendEndpoint.UpdateOrders
  | BackendEndpoint.UpdatePluginSettings
  | BackendEndpoint.UpdateProductSettings
  | BackendEndpoint.UpdateShipments;

/**
 * All backend endpoints that are queries.
 */
export type BackendQueryEndpoints =
  | BackendEndpoint.FetchContext
  | BackendEndpoint.FetchOrders
  | BackendEndpoint.FetchProducts
  | BackendEndpoint.FetchShipments
  | BackendEndpoint.FetchWebhooks;
