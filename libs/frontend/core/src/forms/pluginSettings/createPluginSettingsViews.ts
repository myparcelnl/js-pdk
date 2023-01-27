import {FormInstance} from '@myparcel/vue-form-builder';
import {createActionContext} from '../../services';
import {createPluginSettingsForm} from './createPluginSettingsForm';
import {pluginSettingsUpdateAction} from '../../actions';
import {useContextStore} from '../../stores';
import {useLogger} from '../../composables';

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
  const actionContext = createActionContext(pluginSettingsUpdateAction);

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
        form: createPluginSettingsForm(id, view, actionContext),
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
        form: createPluginSettingsForm(id, subview, actionContext),
      })),
    };
  });
};
