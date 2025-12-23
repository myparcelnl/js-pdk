import {h, type VNode} from 'vue';
import MagicForm from '@myparcel-dev/vue-form-builder';
import {type TabDefinition} from '../../types';
import {useLanguage} from '../../composables';
import {type FormTab} from './types';

export const createFormTab = (tab: FormTab): TabDefinition => {
  const language = useLanguage();
  const children: VNode[] = [h('div', {}, h(MagicForm, {form: tab.form}))];

  if (tab.description && language.has(tab.description)) {
    children.unshift(h('p', language.translate(tab.description)));
  }

  return {
    ...tab,
    component: () => h('div', {}, children),
  };
};
