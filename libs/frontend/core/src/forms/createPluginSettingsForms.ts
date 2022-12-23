import {FormInstance, defineForm} from '@myparcel/vue-form-builder';
import SubmitButton from '../components/common/SubmitButton.vue';
import {generateFormFields} from './generateFormFields';
import {useContextStore} from '../stores';
import {usePluginSettings} from '../composables';
import {useUpdatePluginSettingsMutation} from '../utils';

export const createPluginSettingsForms = (): FormInstance[] => {
  const pluginSettings = usePluginSettings();
  const contextStore = useContextStore();

  const updatePluginSettingsMutation = useUpdatePluginSettingsMutation();

  // @ts-expect-error todo
  return Object.entries(contextStore.context.pluginSettingsView ?? {}).map(([key, fields]) => {
    return defineForm(`${key}Settings`, {
      fields: [
        ...generateFormFields(
          {
            fields,
            // @ts-expect-error todo
            values: pluginSettings[key as keyof typeof pluginSettings],
          },
          `${key}.`,
        ),
        {
          component: SubmitButton,
        },
      ],

      async afterSubmit(form: FormInstance) {
        await updatePluginSettingsMutation.mutateAsync(form);
      },
    });
  });
};
