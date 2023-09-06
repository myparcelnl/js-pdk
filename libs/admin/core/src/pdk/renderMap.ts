/* eslint-disable @typescript-eslint/naming-convention */
import {type Component} from 'vue';
import {AdminView, type ComponentImportFunction} from '@myparcel-pdk/admin-common';

/**
 * Maps components to render methods.
 */
const renderMap = Object.freeze<Record<AdminView, ComponentImportFunction>>({
  [AdminView.ChildProductSettings]: async () => import('../views/ChildProductSettings.vue'),
  [AdminView.Modals]: async () => import('../views/Modals.vue'),
  [AdminView.Notifications]: async () => import('../views/Notifications.vue'),
  [AdminView.OrderBox]: async () => import('../views/OrderBox.vue'),
  [AdminView.OrderListItem]: async () => import('../views/OrderListItem.vue'),
  [AdminView.PluginSettings]: async () => import('../views/PluginSettings.vue'),
  [AdminView.ProductSettings]: async () => import('../views/ProductSettings.vue'),
});

export const renderViewComponent = async (componentName: AdminView): Promise<Component> => {
  const renderMethod = renderMap[componentName];

  if (!renderMethod) {
    throw new Error(`No render method found for component "${componentName}"`);
  }

  return (await renderMethod()).default;
};
