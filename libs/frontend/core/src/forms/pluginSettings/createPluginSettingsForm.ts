import {FormInstance, defineForm} from '@myparcel/vue-form-builder';
import {usePdkConfig, usePluginSettings} from '../../composables';
import {Plugin} from '@myparcel-pdk/common';
import SubmitButton from '../../components/common/SubmitButton.vue';
import {generateFormFields} from './generateFormFields';
import {useUpdatePluginSettingsMutation} from '../../actions';

export const createPluginSettingsForm = (id: string, view: Plugin.SettingsView): FormInstance => {
  const updatePluginSettingsMutation = useUpdatePluginSettingsMutation();
  const pluginSettings = usePluginSettings();
  const pdkConfig = usePdkConfig();

  return defineForm(`PluginSettings_${id}`, {
    ...pdkConfig.formConfigPluginSettings,
    fields: [
      ...generateFormFields(
        {
          fields: view.fields,
          values: pluginSettings[id as keyof typeof pluginSettings] as Record<string, unknown>,
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

    async afterSubmit(form: FormInstance) {
      await updatePluginSettingsMutation.mutateAsync(form);
    },
  });
};
