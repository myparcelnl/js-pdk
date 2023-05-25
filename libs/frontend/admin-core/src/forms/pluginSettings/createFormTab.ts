import {VNode, h} from 'vue';
import {TabDefinition} from '@myparcel-pdk/common';
import {MagicForm} from '@myparcel/vue-form-builder';
import {useLanguage} from '../../composables';
import {FormTab} from './createPluginSettingsTabs';

export const createFormTab = (tab: FormTab): TabDefinition => {
  const language = useLanguage();
  const children: VNode[] = [h('div', {}, h(MagicForm, {form: tab.form}))];

  if (tab.description && language.has(tab.description)) {
    children.unshift(h('p', language.translate(tab.description)));
  }

  return {
    name: tab.name,
    label: tab.label,
    component: () => h('div', {}, children),
  };
};
