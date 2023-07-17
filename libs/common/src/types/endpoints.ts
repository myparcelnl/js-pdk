/**
 * Endpoints in global context.
 *
 * @see Plugin.ModelContextGlobalContext.endpoints
 * @see https://github.com/myparcelnl/pdk/blob/main/config/actions.php
 */
export enum BackendEndpoint {
  /**
   * Get context.
   */
  FetchContext = 'fetchContext',

  /**
   * Delete account.
   */
  DeleteAccount = 'deleteAccount',

  /**
   * Update account.
   */
  UpdateAccount = 'updateAccount',

  /**
   * Get order data from the plugin.
   */
  FetchOrders = 'fetchOrders',

  /**
   * Tells the plugin to update the orders by fetching data from MyParcel.
   */
  UpdateOrders = 'updateOrders',

  /**
   * Export orders to MyParcel as shipments or orders, depending on the plugin settings.
   */
  ExportOrders = 'exportOrders',

  /**
   * Print all shipments belonging to the given orders.
   */
  PrintOrders = 'printOrders',

  /**
   * Delete given shipments.
   */
  DeleteShipments = 'deleteShipments',

  /**
   * Print given shipments.
   */
  PrintShipments = 'printShipments',

  /**
   * Tell the plugin to update given shipments by fetching data from MyParcel.
   */
  UpdateShipments = 'updateShipments',

  /**
   * Get shipment data from the plugin.
   */
  FetchShipments = 'fetchShipments',

  /**
   * Create return shipments
   */
  ExportReturn = 'exportReturn',

  /**
   * Update plugin settings.
   */
  UpdatePluginSettings = 'updatePluginSettings',

  /**
   * Update product settings
   */
  UpdateProductSettings = 'updateProductSettings',

  CreateWebhooks = 'createWebhooks',
  DeleteWebhooks = 'deleteWebhooks',
  FetchWebhooks = 'fetchWebhooks',
}

/**
 * Endpoints in checkout context.
 *
 * @see Plugin.ModelContextCheckoutContext.endpoints
 * @see https://github.com/myparcelnl/pdk/blob/main/config/actions.php
 */
export enum FrontendEndpoint {
  /**
   * Get checkout context.
   */
  FetchCheckoutContext = 'fetchCheckoutContext',
}

export const BACKEND_ENDPOINTS_ORDERS = [
  BackendEndpoint.UpdateOrders,
  BackendEndpoint.ExportOrders,
  BackendEndpoint.PrintOrders,
] as const;

export const BACKEND_ENDPOINTS_SHIPMENTS = [
  BackendEndpoint.DeleteShipments,
  BackendEndpoint.PrintShipments,
  BackendEndpoint.UpdateShipments,
] as const;

export const BACKEND_ENDPOINTS_WEBHOOKS = [
  BackendEndpoint.CreateWebhooks,
  BackendEndpoint.DeleteWebhooks,
  BackendEndpoint.FetchWebhooks,
] as const;
