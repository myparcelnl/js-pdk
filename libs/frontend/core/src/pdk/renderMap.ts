/* eslint-disable @typescript-eslint/naming-convention */
import {ComponentImportFunction, PdkViewComponent} from '@myparcel-pdk/common';
import {Component} from 'vue';

/**
 * Maps components to render methods.
 */
const renderMap = Object.freeze<Record<PdkViewComponent, ComponentImportFunction>>({
  LoadingPage: async () => import('../views/LoadingPage.vue'),
  Modals: async () => import('../views/Modals.vue'),
  Notifications: async () => import('../views/Notifications.vue'),
  OrderCard: async () => import('../views/OrderCard.vue'),
  OrderListColumn: async () => import('../views/OrderListColumn.vue'),
  PluginSettings: async () => import('../views/PluginSettings.vue'),
  ProductSettings: async () => import('../views/ProductSettings.vue'),
});

export const renderViewComponent = async (componentName: PdkViewComponent): Promise<Component> => {
  const renderMethod = renderMap[componentName];

  if (!renderMethod) {
    throw new Error(`No render method found for component "${componentName}"`);
  }

  return (await renderMethod()).default;
};
