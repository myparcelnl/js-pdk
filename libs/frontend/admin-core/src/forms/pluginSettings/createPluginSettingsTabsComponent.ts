import {Component, defineComponent, h} from 'vue';
import {Plugin} from '@myparcel-pdk/common/src';
import {PluginSettingsTabsContext} from './createPluginSettingsTabs';
import {TabNavigation} from '../../components';
import {createFormTab} from './createFormTab';
import {createPluginSettingsForm} from './createPluginSettingsForm';

export const createPluginSettingsTabsComponent = (
  id: string,
  view: Plugin.SettingsView,
  context: PluginSettingsTabsContext,
): Component =>
  defineComponent({
    name: `PluginSettings-${id}`,

    setup: () => {
      return {
        tabs: (view.children ?? []).map((subview) => {
          return createFormTab({
            name: `${id}.${subview.id}`,
            label: subview.title,
            description: subview.description,
            form: createPluginSettingsForm(`${id}.${subview.id}`, subview, context),
          });
        }),
      };
    },

    render() {
      return h('div', [
        h(TabNavigation, {
          hashPrefix: `${view.id}-`,
          tabs: this.tabs,
        }),
      ]);
    },
  });
