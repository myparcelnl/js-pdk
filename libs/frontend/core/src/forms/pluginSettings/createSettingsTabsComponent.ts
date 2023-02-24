import {VNode, h} from 'vue';
import {Plugin} from '@myparcel-pdk/common/src';
import {PluginSettingsTabsContext} from './createPluginSettingsTabs';
import {TabNavigation} from '../../components';
import {createFormTab} from './createFormTab';
import {createPluginSettingsForm} from './createPluginSettingsForm';

export const createSettingsTabsComponent = (
  id: string,
  view: Plugin.SettingsView,
  context: PluginSettingsTabsContext,
): VNode => {
  const tabs = (view.children ?? []).map((subview) => {
    return createFormTab({
      name: `${id}.${subview.id}`,
      label: subview.title,
      description: subview.description,
      form: createPluginSettingsForm(`${id}.${subview.id}`, subview, context),
    });
  });

  return h('div', {}, [
    h(TabNavigation, {
      hashPrefix: `${view.id}-`,
      tabs,
    }),
  ]);
};
