import {ActionContext, executeAction, useUpdatePluginSettingsMutation} from '../../actions';
import {FormInstance, defineForm} from '@myparcel/vue-form-builder';
import {usePdkConfig, usePluginSettings} from '../../composables';
import {FrontendAction} from '../../types';
import {Plugin} from '@myparcel-pdk/common';
import SubmitButton from '../../components/common/SubmitButton.vue';
import {generateFormFields} from './generateFormFields';
import {get} from 'lodash-unified';

export const createPluginSettingsForm = (
  id: string,
  view: Plugin.SettingsView,
  actionContext: ActionContext<FrontendAction.PLUGIN_SETTINGS_UPDATE>,
): FormInstance => {
  const updatePluginSettingsMutation = useUpdatePluginSettingsMutation();
  const pluginSettings = usePluginSettings();
  const pdkConfig = usePdkConfig();

  return defineForm(id, {
    ...pdkConfig.formConfigPluginSettings,
    fields: [
      ...generateFormFields(
        {
          fields: view.elements,
          values: get(pluginSettings, id, {}),
        },
        `${id}.`,
      ),
      {
        component: SubmitButton,
        props: {
          loading: updatePluginSettingsMutation.isLoading,
        },
      },
    ],

    async afterSubmit(form) {
      const context: ActionContext<FrontendAction.PLUGIN_SETTINGS_UPDATE> = {
        ...actionContext,
        parameters: {
          form,
        },
      };

      await executeAction(context);
    },
  });
};
