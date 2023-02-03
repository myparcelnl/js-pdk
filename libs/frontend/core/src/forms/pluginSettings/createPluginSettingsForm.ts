import {ActionContext, executeAction} from '../../actions';
import {AdminAction, ContextKey} from '../../types';
import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {FormInstance, defineForm} from '@myparcel/vue-form-builder';
import {ResolvedQuery} from '../../stores';
import SubmitButton from '../../components/common/SubmitButton.vue';
import {generateFormFields} from './generateFormFields';
import {get} from 'lodash-unified';
import {usePdkConfig} from '../../composables';

export const createPluginSettingsForm = (
  id: string,
  view: Plugin.SettingsView,
  actionContext: ActionContext<AdminAction.PLUGIN_SETTINGS_UPDATE>,
  mutation: ResolvedQuery<EndpointName.UPDATE_PLUGIN_SETTINGS>,
  query: ResolvedQuery<`${EndpointName.FETCH_CONTEXT}.${ContextKey.PLUGIN_SETTINGS_VIEW}`>,
): FormInstance => {
  const pdkConfig = usePdkConfig();

  return defineForm(id, {
    ...pdkConfig.formConfigPluginSettings,
    fields: [
      ...generateFormFields(
        {
          fields: view.elements,
          values: get(query.data, id, {}),
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
