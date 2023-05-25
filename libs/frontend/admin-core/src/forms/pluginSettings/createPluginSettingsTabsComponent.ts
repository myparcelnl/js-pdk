import {AdminView, Plugin} from '@myparcel-pdk/common';
import {Component, defineComponent, h} from 'vue';
import {HASH_SEPARATOR} from '../../data';
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
    name: `${AdminView.PluginSettings}-${id}`,

    setup: () => {
      return {
        tabs: (view.children ?? []).map((subview) => {
          const {subtext, description, id: subviewId, title} = subview;

          return createFormTab({
            name: `${id}.${subviewId}`,
            label: title,
            form: createPluginSettingsForm(`${id}.${subviewId}`, subview, context),
            description,
            subtext,
          });
        }),
      };
    },

    render() {
      return h('div', [
        h(TabNavigation, {
          hashPrefix: `${view.id}${HASH_SEPARATOR}`,
          tabs: this.tabs,
        }),
      ]);
    },
  });
