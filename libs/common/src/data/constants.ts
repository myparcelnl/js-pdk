export enum TriState {
  Inherit = -1,
  On = 1,
  Off = 0,
}

export enum SortType {
  Ascending = 'asc',
  Descending = 'desc',
}

export enum AdminContextKey {
  Global = 'global',
  Dynamic = 'dynamic',
  OrderData = 'orderData',
  PluginSettingsView = 'pluginSettingsView',
  ProductData = 'productData',
  ProductSettingsView = 'productSettingsView',

  Instance = 'instance',
}
