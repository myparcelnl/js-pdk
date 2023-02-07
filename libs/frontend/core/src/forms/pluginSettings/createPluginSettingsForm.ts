import {ActionContext, executeAction} from '../../actions';
import {FormInstance, defineForm} from '@myparcel/vue-form-builder/src';
import {AdminAction} from '../../types';
import {Plugin} from '@myparcel-pdk/common/src';
import {PluginSettingsTabsContext} from './createPluginSettingsTabs';
import {SubmitButton} from '../../components';
import {generateFormFields} from './generateFormFields';
import {get} from 'lodash-unified';
import {unref} from 'vue';
import {usePdkConfig} from '../../composables';

export const createPluginSettingsForm = (
  id: string,
  view: Plugin.SettingsView,
  actionContext: ActionContext<AdminAction.PLUGIN_SETTINGS_UPDATE>,
  {mutation, query}: PluginSettingsTabsContext,
): FormInstance => {
  const pdkConfig = usePdkConfig();
  const values = get(unref(query.data), id, {});

  const generatedFields = generateFormFields({fields: view.elements, values}, `${id}.`);

  return defineForm(id, {
    ...pdkConfig.formConfigPluginSettings,
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
      await executeAction({
        ...actionContext,
        parameters: {form},
      });
    },
  });
};
