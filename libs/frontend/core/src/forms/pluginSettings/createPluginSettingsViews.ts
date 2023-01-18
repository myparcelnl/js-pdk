import {FormInstance} from '@myparcel/vue-form-builder';
import {createPluginSettingsForm} from './createPluginSettingsForm';
import {useContextStore} from '../../stores';
import {useLogger} from '../../composables/useLogger';

interface BaseSettingsView {
  title: string;
  description?: string;
  id: string;
}

export interface FormSettingsView extends BaseSettingsView {
  form: FormInstance;
}

export interface ChildrenSettingsView extends BaseSettingsView {
  children: FormSettingsView[];
}

export const createPluginSettingsViews = (): (FormSettingsView | ChildrenSettingsView)[] => {
  const contextStore = useContextStore();

  if (!contextStore.context.pluginSettingsView) {
    const logger = useLogger();

    logger.error('No views found in context');
    return [];
  }

  return Object.entries(contextStore.context.pluginSettingsView).map(([id, view]) => {
    if (!view.children.length) {
      return {
        id,
        title: view.title,
        description: view.description,
        form: createPluginSettingsForm(id, view),
      };
    }

    return {
      id,
      title: view.title,
      description: view.description,
      children: view.children.map((subview) => ({
        id: id + subview.title,
        title: subview.title,
        description: subview.description,
        form: createPluginSettingsForm(id, subview),
      })),
    };
  });
};
