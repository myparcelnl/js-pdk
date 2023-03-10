import {AdminAction, AdminConfiguration} from '../../types';
import {Plugin, TabDefinition} from '@myparcel-pdk/common/src';
import {h, markRaw} from 'vue';
import {ActionContext} from '../../actions';
import {FormInstance} from '@myparcel/vue-form-builder/src';
import {createFormTab} from './createFormTab';
import {createPluginSettingsForm} from './createPluginSettingsForm';
import {createPluginSettingsTabsComponent} from './createPluginSettingsTabsComponent';
import {useLanguage} from '../../composables';

export interface FormTab extends Omit<TabDefinition, 'component'> {
  form: FormInstance;
}

export type PluginSettingsTabsContext = {
  pluginSettings: Plugin.ModelContextDynamicContext['pluginSettings'];
  actionContext: ActionContext<AdminAction.PluginSettingsUpdate>;
  config: AdminConfiguration;
};

export const createPluginSettingsTabs = (
  view: Plugin.ModelContextPluginSettingsViewContext,
  context: PluginSettingsTabsContext,
): TabDefinition[] => {
  return Object.entries(view).map(([id, view]) => {
    const tab = {
      name: id,
      label: view.title,
    };

    // If children is null, it's a single form
    if (!view.children) {
      return createFormTab({...tab, form: createPluginSettingsForm(id, view, context)});
    }

    // If children is an empty array, it's an empty view
    if (!view.children.length) {
      const {translate} = useLanguage();

      return {...tab, component: h('div', {}, translate(`view_${id}_empty`))};
    }

    // If children is an array, it's a tabbed view
    return {...tab, component: markRaw(createPluginSettingsTabsComponent(id, view, context))};
  });
};
