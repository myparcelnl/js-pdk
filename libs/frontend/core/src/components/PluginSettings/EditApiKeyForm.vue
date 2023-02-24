<template>
  <div>
    <MagicForm
      :form="form"
      @afterSubmit="$emit('afterSubmit', $event)" />
  </div>
</template>

<script lang="ts" setup>
import {FormInstance, MagicForm, defineForm} from '@myparcel/vue-form-builder/src';
import {markRaw, ref, resolveComponent, watch} from 'vue';
import {updateAccountAction, useUpdateAccountMutation} from '../../actions';
import {usePluginSettings, useStoreContextQuery} from '../../composables';
import {SubmitButton} from '../common';
import {createActionContext} from '../../services';
import {createUpdateAccountSettingsValidator} from './createUpdateAccountSettingsValidator';
import {defineField} from '@myparcel/vue-form-builder';
import {defineFormField} from '../../forms';

defineEmits<(e: 'afterSubmit', form: FormInstance) => void>();

const updateAccount = useUpdateAccountMutation();

const createForm = (): FormInstance => {
  const actionContext = createActionContext(updateAccountAction);
  const pluginSettings = usePluginSettings();

  return defineForm('accountSettings', {
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
