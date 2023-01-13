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
    if (Array.isArray(view)) {
      return {
        title: view[0].title,
        id,
        children: view.map((subview) => {
          return {
            title: subview.title,
            id: id + subview.title,
            form: createPluginSettingsForm(id, subview),
          };
        }),
      };
    }

    return {
      title: view.title,
      id,
      form: createPluginSettingsForm(id, view),
    };
  });
};
