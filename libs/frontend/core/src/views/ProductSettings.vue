<template>
  <div v-test>
    <MagicForm :form="form" />
  </div>
</template>

<script setup lang="ts">
/**
 * Product settings.
 */
import {FormInstance, MagicForm, defineForm} from '@myparcel/vue-form-builder';
import {generateFormFields} from '../forms';
import {useContextStore} from '../stores';
import {usePdkConfig} from '../composables';
import {useUpdateProductSettingsMutation} from '../actions';

const contextStore = useContextStore();
const updateProductSettingsMutation = useUpdateProductSettingsMutation();
const pdkConfig = usePdkConfig();

const createProductSettingsForm = (): FormInstance => {
  const {productSettingsView} = contextStore.context;

  if (!productSettingsView) {
    throw new Error('Product settings not loaded');
  }

  return defineForm('productSettings', {
    ...pdkConfig.formConfigProductSettings,
    fields: [
      ...generateFormFields(
        {
          // @ts-expect-error todo
          fields: productSettingsView.view.elements,
          values: productSettingsView.values,
        },
        'product',
      ),
    ],

    afterSubmit: async (form: FormInstance) => {
      await updateProductSettingsMutation.mutateAsync({
        form,
        productIds: [productSettingsView.product.externalIdentifier],
      });
    },
  });
};

const form = createProductSettingsForm();
</script>
