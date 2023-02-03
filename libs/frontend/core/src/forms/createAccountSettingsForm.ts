/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {ActionContext, executeAction, updateAccountAction} from '../actions';
import {defineField, defineForm} from '@myparcel/vue-form-builder';
import {ref, resolveComponent} from 'vue';
import {usePluginSettings, useStoreQuery} from '../composables';
import {AdminAction} from '../types';
import {EndpointName} from '@myparcel-pdk/common';
import {SubmitButton} from '../components';
import {createActionContext} from '../services';
import {defineFormField} from './createShipmentOptionsForm';

export const createAccountSettingsForm = (callback?: () => void) => {
  const updateAccountMutation = useStoreQuery(EndpointName.UPDATE_ACCOUNT);
  const actionContext = createActionContext(updateAccountAction);

  const pluginSettings = usePluginSettings();

  return defineForm('accountSettings', {
    fields: [
      defineFormField({
        component: resolveComponent('PdkTextInput'),
        label: 'settings_account_api_key',
        name: 'apiKey',
        ref: ref(pluginSettings.account.apiKey),
      }),

      defineField({
        component: SubmitButton,
        props: {
          loading: updateAccountMutation.isLoading,
        },
      }),
    ],

    async afterSubmit(form) {
      const context: ActionContext<AdminAction.ACCOUNT_UPDATE> = {
        ...actionContext,
        parameters: {
          form,
        },
      };

      await executeAction(context);
      callback?.();
    },
  });
};
