<template>
  <div v-test="$.type.__name">
    <MagicForm
      :form="form as FormInstance"
      @afterSubmit="$emit('afterSubmit', $event)" />

    <NotificationContainer :category="NotificationCategory.Api" />
  </div>
</template>

<script lang="ts" setup>
import {computed, markRaw, ref, watch} from 'vue';
import {get} from '@vueuse/core';
import {AdminComponent, NotificationCategory, Size, Variant} from '@myparcel-pdk/admin-common';
import {defineField, defineForm, FormHook, type FormInstance, MagicForm} from '@myparcel/vue-form-builder';
import NotificationContainer from '../common/NotificationContainer.vue';
import {ResetButton, SubmitButton} from '../common';
import {AdminAction} from '../../types';
import {useActionStore} from '../../stores';
import {defineFormField, FORM_KEY_ACCOUNT_SETTINGS, resolveFormComponent} from '../../forms';
import {useAdminConfig, usePluginSettings, useStoreContextQuery} from '../../composables';

defineEmits<(e: 'afterSubmit', form: FormInstance) => void>();

const FIELD_API_KEY = 'apiKey';

const API_KEY_LABEL = 'settings_account_api_key';

const createForm = (): FormInstance => {
  const actionStore = useActionStore();
  const config = useAdminConfig();
  const pluginSettings = usePluginSettings();

  const apiKeyRef = ref(pluginSettings.account.apiKey);

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
        readOnlyWhen: () => Boolean(hasAccount.value),
      }),

      defineField({
        component: SubmitButton,
        visibleWhen: () => !hasAccount.value,
        readOnlyWhen: () => !apiKeyRef.value,
      }),

      defineField({
        component: ResetButton,
        attributes: {
          label: 'action_delete',
          variant: Variant.Error,
          size: Size.Small,
        },
        visibleWhen: () => Boolean(hasAccount.value),
        readOnlyWhen: () => !apiKeyRef.value,
      }),
    ],

    [FormHook.AfterSubmit]: async (form: FormInstance): Promise<void> => {
      await actionStore.dispatch(AdminAction.AccountUpdate, {form});
    },

    [FormHook.AfterReset]: async (): Promise<void> => {
      await actionStore.dispatch(AdminAction.AccountDelete);
    },
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
