import {get as lodashGet} from 'lodash-unified';
import {BackendEndpoint, Plugin} from '@myparcel-pdk/common';
import {FormInstance, defineForm} from '@myparcel/vue-form-builder';
import {useStoreQuery} from '../../composables';
import {SubmitButton} from '../../components';
import {executeAction} from '../../actions';
import {generateFormFields} from './generateFormFields';
import {PluginSettingsTabsContext} from './createPluginSettingsTabs';

export const createPluginSettingsForm = (
  id: string,
  view: Plugin.SettingsView,
  context: PluginSettingsTabsContext,
): FormInstance => {
  const {pluginSettings, actionContext} = context;

  const mutation = useStoreQuery(BackendEndpoint.UpdatePluginSettings);

  const values = lodashGet(pluginSettings, id, {});

  const generatedFields = generateFormFields({fields: view.elements, values}, `${id}.`);

  return defineForm(id, {
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
  });
};
