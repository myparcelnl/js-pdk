import {h, type VNode} from 'vue';
import MagicForm from '@myparcel-dev/vue-form-builder';
import {type TabDefinition} from '../../types';
import {useLanguage} from '../../composables';
import {type FormTab} from './types';

console.log('[DEBUG] MagicForm imported:', MagicForm);
console.log('[DEBUG] MagicForm type:', typeof MagicForm);
console.log('[DEBUG] MagicForm name:', MagicForm?.name);

export const createFormTab = (tab: FormTab): TabDefinition => {
  console.log('[DEBUG] createFormTab called with tab:', tab.name);
  console.log('[DEBUG] tab.form:', tab.form);
  console.log('[DEBUG] tab.form.fields:', tab.form?.fields);
  
  const language = useLanguage();
  
  const magicFormVNode = h(MagicForm, {form: tab.form});
  console.log('[DEBUG] MagicForm VNode created:', magicFormVNode);
  
  const children: VNode[] = [h('div', {}, magicFormVNode)];

  if (tab.description && language.has(tab.description)) {
    children.unshift(h('p', language.translate(tab.description)));
  }

  return {
    ...tab,
    component: () => {
      console.log('[DEBUG] Rendering component for tab:', tab.name);
      console.log('[DEBUG] form being passed to MagicForm:', tab.form);
      console.log('[DEBUG] form.fields:', tab.form?.fields);
      console.log('[DEBUG] form.name:', tab.form?.name);
      console.log('[DEBUG] form.config:', tab.form?.config);
      return h('div', {}, children);
    },
  };
};
