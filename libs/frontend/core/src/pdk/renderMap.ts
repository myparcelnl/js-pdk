/* eslint-disable @typescript-eslint/naming-convention */
import {ComponentImportFunction, PdkAdminComponent} from '@myparcel-pdk/common/src';
import {Component} from 'vue';

/**
 * Maps components to render methods.
 */
const renderMap = Object.freeze<Record<PdkAdminComponent, ComponentImportFunction>>({
  LoadingPage: async () => import('../views/LoadingPage.vue'),
  Modals: async () => import('../views/Modals.vue'),
  Notifications: async () => import('../views/Notifications.vue'),
  OrderBox: async () => import('../views/OrderBox.vue'),
  OrderListColumn: async () => import('../views/OrderListItem.vue'),
  PluginSettings: async () => import('../views/PluginSettings.vue'),
  ProductSettings: async () => import('../views/ProductSettings.vue'),
});

export const renderViewComponent = async (componentName: PdkAdminComponent): Promise<Component> => {
  const renderMethod = renderMap[componentName];

  if (!renderMethod) {
    throw new Error(`No render method found for component "${componentName}"`);
  }

  return (await renderMethod()).default;
};
