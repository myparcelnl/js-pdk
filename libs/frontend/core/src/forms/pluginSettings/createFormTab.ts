import {VNode, h} from 'vue';
import {FormTab} from './createPluginSettingsTabs';
import {MagicForm} from '@myparcel/vue-form-builder/src';
import {PdkTab} from '@myparcel-pdk/common/src';
import {useLanguage} from '../../composables';

export const createFormTab = (tab: FormTab): PdkTab => {
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
