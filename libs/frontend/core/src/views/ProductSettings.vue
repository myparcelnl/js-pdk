<template>
  <MagicForm :form="form" />
</template>

<script setup lang="ts">
/**
 * Product settings.
 */
import {FormInstance, MagicForm, defineForm} from '@myparcel/vue-form-builder';
import {generateFormFields} from '../forms/generateFormFields';
import {useContextStore} from '../stores';
import {useUpdateProductSettingsMutation} from '../actions';

const contextStore = useContextStore();
const updateProductSettingsMutation = useUpdateProductSettingsMutation();

const createProductSettingsForm = (): FormInstance => {
  if (!contextStore.context.productSettingsView) {
    throw new Error('Plugin settings not loaded');
  }

  // @ts-expect-error afterSubmit currently generates an error but it does work
  return defineForm('productSettings', {
    fields: generateFormFields(contextStore.context.productSettingsView),

    afterSubmit: async (form: FormInstance) => {
      await updateProductSettingsMutation.mutateAsync(form);
    },
  });
};

const form = createProductSettingsForm();
</script>
