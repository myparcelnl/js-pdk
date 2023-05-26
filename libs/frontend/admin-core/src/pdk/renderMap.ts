/* eslint-disable @typescript-eslint/naming-convention */
import {type Component} from 'vue';
import {type AdminView, type ComponentImportFunction} from '@myparcel-pdk/common';

/**
 * Maps components to render methods.
 */
const renderMap = Object.freeze<Record<AdminView, ComponentImportFunction>>({
  Modals: async () => import('../views/Modals.vue'),
  Notifications: async () => import('../views/Notifications.vue'),
  OrderBox: async () => import('../views/OrderBox.vue'),
  OrderListItem: async () => import('../views/OrderListItem.vue'),
  PluginSettings: async () => import('../views/PluginSettings.vue'),
  ProductSettings: async () => import('../views/ProductSettings.vue'),
});

export const renderViewComponent = async (componentName: AdminView): Promise<Component> => {
  const renderMethod = renderMap[componentName];

  if (!renderMethod) {
    throw new Error(`No render method found for component "${componentName}"`);
  }

  return (await renderMethod()).default;
};
