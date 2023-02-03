import {ActionContext, executeAction} from '../../actions';
import {FormInstance, defineForm} from '@myparcel/vue-form-builder';
import {AdminAction} from '../../types';
import {Plugin} from '@myparcel-pdk/common';
import {PluginSettingsTabsContext} from './createPluginSettingsTabs';
import {SubmitButton} from '../../components';
import {generateFormFields} from './generateFormFields';
import {get} from 'lodash';
import {usePdkConfig} from '../../composables';

export const createPluginSettingsForm = (
  id: string,
  view: Plugin.SettingsView,
  actionContext: ActionContext<AdminAction.PLUGIN_SETTINGS_UPDATE>,
  {mutation, query}: PluginSettingsTabsContext,
): FormInstance => {
  const pdkConfig = usePdkConfig();

  return defineForm(id, {
    ...pdkConfig.formConfigPluginSettings,
    fields: [
      ...generateFormFields(
        {
          fields: view.elements,
          values: get(query.data.value, id, {}),
        },
        `${id}.`,
      ),
      {
        component: SubmitButton,
        props: {
          loading: mutation.isLoading,
        },
      },
    ],

    async afterSubmit(form) {
      const context: ActionContext<AdminAction.PLUGIN_SETTINGS_UPDATE> = {
        ...actionContext,
        parameters: {
          form,
        },
      };

      await executeAction(context);
    },
  });
};
