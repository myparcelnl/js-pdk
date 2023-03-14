<template>
  <div>
    <MagicForm
      :form="form"
      @afterSubmit="$emit('afterSubmit', $event)" />
  </div>
</template>

<script lang="ts" setup>
import {FormInstance, MagicForm, defineField, defineForm} from '@myparcel/vue-form-builder/src';
import {markRaw, ref, resolveComponent, watch} from 'vue';
import {useAdminConfig, usePluginSettings, useStoreContextQuery} from '../../composables';
import {FORM_KEY_ACCOUNT_SETTINGS} from '../../forms/formKeys';
import {SubmitButton} from '../common';
import {createActionContext} from '../../services';
import {createUpdateAccountSettingsValidator} from './createUpdateAccountSettingsValidator';
import {defineFormField} from '../../forms';
import {updateAccountAction} from '../../actions';

defineEmits<(e: 'afterSubmit', form: FormInstance) => void>();

const createForm = (): FormInstance => {
  const actionContext = createActionContext(updateAccountAction);
  const pluginSettings = usePluginSettings();

  const config = useAdminConfig();
  return defineForm(FORM_KEY_ACCOUNT_SETTINGS, {
    ...config.formConfigOverrides?.[FORM_KEY_ACCOUNT_SETTINGS],
    fields: [
      defineFormField({
        component: resolveComponent('PdkTextInput'),
        label: 'settings_account_api_key',
        name: 'apiKey',
        validators: [
          {
            message: 'settings_account_api_key_required',
            validate: createUpdateAccountSettingsValidator(actionContext),
          },
        ],
        ref: ref(pluginSettings.account.apiKey),
      }),

      defineField({component: SubmitButton}),
    ],
  });
};

const contextQuery = useStoreContextQuery();

const form = ref<FormInstance>();

watch(
  contextQuery.data,
  () => {
    form.value = markRaw(createForm());
  },
  {immediate: true},
);
</script>
