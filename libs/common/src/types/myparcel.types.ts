/**
 * Endpoints in global context.
 *
 * @see Plugin.ModelContextGlobalContext.endpoints
 * @see https://github.com/myparcelnl/pdk/blob/main/config/actions.php
 */
export enum EndpointName {
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

  // todo
  CREATE_WEBHOOKS = 'createWebhooks',
  // todo
  DELETE_WEBHOOKS = 'deleteWebhooks',
  // todo
  REFRESH_WEBHOOKS = 'refreshWebhooks',
}
