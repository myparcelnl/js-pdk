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
  FETCH_CONTEXT = 'fetchContext',

  /**
   * Update account.
   */
  UPDATE_ACCOUNT = 'updateAccount',

  /**
   * Get order data from the plugin.
   */
  FETCH_ORDERS = 'fetchOrders',

  /**
   * Tells the plugin to update the orders by fetching data from MyParcel.
   */
  UPDATE_ORDERS = 'updateOrders',

  /**
   * Export orders to MyParcel as shipments or orders, depending on the plugin settings.
   */
  EXPORT_ORDERS = 'exportOrders',

  /**
   * Print all shipments belonging to the given orders.
   */
  PRINT_ORDERS = 'printOrders',

  /**
   * Delete given shipments.
   */
  DELETE_SHIPMENTS = 'deleteShipments',

  /**
   * Print given shipments.
   */
  PRINT_SHIPMENTS = 'printShipments',

  /**
   * Tell the plugin to update given shipments by fetching data from MyParcel.
   */
  FETCH_SHIPMENTS = 'fetchShipments',

  /**
   * Create return shipments
   */
  CREATE_RETURN_SHIPMENTS = 'createReturnShipments',

  /**
   * Update plugin settings.
   */
  UPDATE_PLUGIN_SETTINGS = 'updatePluginSettings',

  /**
   * Update product settings
   */
  UPDATE_PRODUCT_SETTINGS = 'updateProductSettings',

  CREATE_WEBHOOKS = 'createWebhooks',
  DELETE_WEBHOOKS = 'deleteWebhooks',
  FETCH_WEBHOOKS = 'fetchWebhooks',
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
  FETCH_CHECKOUT_CONTEXT = 'fetchCheckoutContext',
}

export const BACKEND_ENDPOINTS_ORDERS = [
  BackendEndpoint.FETCH_ORDERS,
  BackendEndpoint.UPDATE_ORDERS,
  BackendEndpoint.EXPORT_ORDERS,
  BackendEndpoint.PRINT_ORDERS,
] as const;

export const BACKEND_ENDPOINTS_SHIPMENTS = [
  BackendEndpoint.DELETE_SHIPMENTS,
  BackendEndpoint.PRINT_SHIPMENTS,
  BackendEndpoint.FETCH_SHIPMENTS,
] as const;

export const BACKEND_ENDPOINTS_WEBHOOKS = [
  BackendEndpoint.CREATE_WEBHOOKS,
  BackendEndpoint.DELETE_WEBHOOKS,
  BackendEndpoint.FETCH_WEBHOOKS,
] as const;
