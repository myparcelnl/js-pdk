import {ChildrenSettingsView, createPluginSettingsViews} from './createPluginSettingsViews';
import {PdkTab} from '@myparcel-pdk/common';
import {TabNavigation} from '../../components';
import {createFormTab} from './createFormTab';
import {h} from 'vue';
import {isOfType} from '@myparcel/ts-utils';

export const createPluginSettingsTabs = (): PdkTab[] => {
  const views = createPluginSettingsViews();

  return views.map((view) => {
    if (isOfType<ChildrenSettingsView>(view, 'children')) {
      const childTabs: PdkTab[] = view.children.map(createFormTab);

      return {
        name: view.id,
        label: view.title,
        component: () => h('div', {}, [h(TabNavigation, {tabs: childTabs, hashPrefix: `${view.id}-`})]),
      };
    }

    return createFormTab(view);
  });
};
