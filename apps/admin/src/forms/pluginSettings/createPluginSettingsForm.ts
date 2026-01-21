import {get as lodashGet} from 'lodash-unified';
import {BackendEndpoint, type Plugin} from '@myparcel-dev/pdk-common';
import {defineForm, type FormInstance, useFormBuilder} from '@myparcel-dev/vue-form-builder';
import {useStoreQuery} from '../../composables';
import {SubmitButton} from '../../components';
import {executeAction} from '../../actions';
import {type PluginSettingsTabsContext} from './types';
import {generateFormFields} from './generateFormFields';

export const createPluginSettingsForm = (
  id: string,
  view: Plugin.SettingsView,
  context: PluginSettingsTabsContext,
): FormInstance => {
  console.log('[DEBUG] createPluginSettingsForm called:', id);
  console.log('[DEBUG] view.elements:', view.elements);
  
  // Debug the formBuilder
  const formBuilder = useFormBuilder();
  console.log('[DEBUG] formBuilder:', formBuilder);
  console.log('[DEBUG] formBuilder.forms:', formBuilder.forms);
  console.log('[DEBUG] formBuilder.defaults:', formBuilder.defaults);
  
  const {pluginSettings, actionContext} = context;
  console.log('[DEBUG] pluginSettings:', pluginSettings);

  const mutation = useStoreQuery(BackendEndpoint.UpdatePluginSettings);

  const values = lodashGet(pluginSettings, id, {});
  console.log('[DEBUG] values for', id, ':', values);

  const generatedFields = generateFormFields({fields: view.elements, values}, `${id}.`);
  console.log('[DEBUG] generatedFields for', id, ':', generatedFields);

  const formConfig = {
    ...context.config.formConfigOverrides?.pluginSettings,
    fields: [
      ...generatedFields,
      {
        component: SubmitButton,
        props: {
          loading: mutation.isLoading,
        },
      },
    ],

    async afterSubmit(form) {
      await executeAction({...actionContext, parameters: {form}});
    },
  };
  
  console.log('[DEBUG] About to call defineForm with config:', formConfig);
  console.log('[DEBUG] formConfig.fields length:', formConfig.fields?.length);
  
  const result = defineForm(id, formConfig);
  
  console.log('[DEBUG] defineForm result:', result);
  console.log('[DEBUG] result.fields:', result.fields);
  console.log('[DEBUG] result.fields.value:', result.fields?.value);
  console.log('[DEBUG] result.config:', result.config);
  console.log('[DEBUG] result.config.fields:', result.config?.fields);
  
  return result;
};
