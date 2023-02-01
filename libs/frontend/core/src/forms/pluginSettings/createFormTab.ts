import {VNode, h} from 'vue';
import {FormTab} from './createPluginSettingsTabs';
import {MagicForm} from '@myparcel/vue-form-builder';
import {PdkTab} from '@myparcel-pdk/common';
import {useLanguage} from '../../composables';

export const createFormTab = (tab: FormTab): PdkTab => {
  const language = useLanguage();
  const children: VNode[] = [h(MagicForm, {form: tab.form})];

  if (tab.description && language.has(tab.description)) {
    children.unshift(h('p', language.translate(tab.description)));
  }

  return {
    name: tab.name,
    label: tab.label,
    component: () => h('div', {}, children),
  };
};
