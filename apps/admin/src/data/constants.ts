export const HASH_SEPARATOR = '--';

export const ADMIN_COMPONENT_PREFIX = 'Pdk';

export enum AdminInstanceContextKey {
  OrderIdentifier = 'orderIdentifier',
  ProductIdentifier = 'productIdentifier',
}

export enum AdminModalKey {
  PrintOptions = 'printOptions',
  ReturnOptions = 'returnOptions',
  ShipmentOptions = 'shipmentOptions',
}

export enum NotificationCategory {
  Action = 'action',
  Api = 'api',
  General = 'general',
  Modal = 'modal',
}

export enum NotificationSource {
  Api = 'api',
}

export enum AdminIcon {
  Add = 'add',
  ArrowDown = 'arrow_down',
  ArrowUp = 'arrow_up',
  Close = 'close',
  Delete = 'delete',
  Download = 'download',
  Edit = 'edit',
  Export = 'export',
  External = 'external',
  No = 'no',
  Print = 'print',
  Refresh = 'refresh',
  Return = 'return',
  Save = 'save',
  Shipment = 'shipment',
  Spinner = 'spinner',
  Yes = 'yes',
}

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

  DownloadLogs = 'downloadLogs',
  SwitchToAcceptanceApi = 'switchToAcceptanceApi',
}
