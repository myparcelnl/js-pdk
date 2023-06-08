<template>
  <MagicForm
    :form="form as FormInstance"
    @afterSubmit="$emit('afterSubmit', $event)" />
</template>

<script lang="ts" setup>
import {markRaw, ref, watch, computed} from 'vue';
import {get} from '@vueuse/core';
import {AdminComponent, Variant, Size} from '@myparcel-pdk/common';
import {type FormInstance, MagicForm, defineField, defineForm, FormHook} from '@myparcel/vue-form-builder';
import {ResetButton, SubmitButton} from '../common';
import {createActionContext} from '../../services';
import {FORM_KEY_ACCOUNT_SETTINGS, defineFormField, resolveFormComponent} from '../../forms';
import {useAdminConfig, usePluginSettings, useStoreContextQuery} from '../../composables';
import {updateAccountAction, executeAction} from '../../actions';

defineEmits<(e: 'afterSubmit', form: FormInstance) => void>();

const FIELD_API_KEY = 'apiKey';

const API_KEY_LABEL = 'settings_account_api_key';

const createForm = (): FormInstance => {
  const actionContext = createActionContext(updateAccountAction);
  const pluginSettings = usePluginSettings();

  const config = useAdminConfig();
  const apiKeyRef = ref(pluginSettings.account.apiKey);

  const submitApiKey = async (form: FormInstance): Promise<void> => {
    const response = await executeAction({...actionContext, parameters: {form}});

    if (response) {
      // TODO: Make this action properly interactive and remove the reload.
      window.location.reload();
    }
  };

  return defineForm(FORM_KEY_ACCOUNT_SETTINGS, {
    ...config.formConfigOverrides?.[FORM_KEY_ACCOUNT_SETTINGS],
    fields: [
      defineFormField({
        component: resolveFormComponent(AdminComponent.TextInput),
        label: API_KEY_LABEL,
        name: FIELD_API_KEY,
        optional: true,
        ref: apiKeyRef,
        isValid: () => Boolean(hasAccount.value),
        disabledWhen: () => Boolean(hasAccount.value),
      }),

      defineField({
        component: SubmitButton,
        visibleWhen: () => !hasAccount.value,
        disabledWhen: () => !apiKeyRef.value,
      }),

      defineField({
        component: ResetButton,
        attributes: {
          label: 'action_delete',
          variant: Variant.Error,
          size: Size.Small,
        },
        visibleWhen: () => Boolean(hasAccount.value),
        disabledWhen: () => !apiKeyRef.value,
      }),
    ],

    [FormHook.AfterSubmit]: submitApiKey,
    [FormHook.AfterReset]: submitApiKey,
  });
};

const contextQuery = useStoreContextQuery();

const form = ref<FormInstance>();

const hasAccount = computed(() => Boolean(get(contextQuery.data)?.account));

watch(
  contextQuery.data,
  () => {
    form.value = markRaw(createForm());
  },
  {immediate: true},
);
</script>
