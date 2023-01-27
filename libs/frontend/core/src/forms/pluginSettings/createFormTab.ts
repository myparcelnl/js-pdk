import {VNode, h} from 'vue';
import {FormSettingsView} from './createPluginSettingsViews';
import {MagicForm} from '@myparcel/vue-form-builder';
import {PdkTab} from '@myparcel-pdk/common';
import {useLanguage} from '../../composables';

export const createFormTab = (view: FormSettingsView): PdkTab => {
  const language = useLanguage();
  const children: VNode[] = [h(MagicForm, {form: view.form})];

  if (view.description && language.has(view.description)) {
    children.unshift(h('p', language.translate(view.description)));
  }

  return {
    name: view.id,
    label: view.title,
    component: () => h('div', {}, children),
  };
};
