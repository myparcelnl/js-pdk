import {h, markRaw} from 'vue';
import {type Plugin} from '@myparcel-pdk/common';
import {type TabDefinition} from '../../types/common.types';
import {useLanguage} from '../../composables/language/useLanguage';
import {type PluginSettingsTabsContext} from './types';
import {createPluginSettingsTabsComponent} from './createPluginSettingsTabsComponent';
import {createPluginSettingsForm} from './createPluginSettingsForm';
import {createFormTab} from './createFormTab';

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
