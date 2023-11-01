import {type Component, defineComponent, h} from 'vue';
import {type Plugin} from '@myparcel-pdk/common';
import {AdminView, HASH_SEPARATOR} from '../../data';
import {TabNavigation} from '../../components';
import {type PluginSettingsTabsContext} from './types';
import {createPluginSettingsForm} from './createPluginSettingsForm';
import {createFormTab} from './createFormTab';

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
          const {subtext, description, id: subviewId, title, titleSuffix} = subview;

          return createFormTab({
            name: `${id}.${subviewId}`,
            label: title,
            labelSuffix: titleSuffix,
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
