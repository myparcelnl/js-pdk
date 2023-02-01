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
import {useContext, usePdkConfig} from '../composables';
import {ContextKey} from '../types';
import {generateFormFields} from '../forms';
import {useUpdateProductSettingsMutation} from '../actions';

const context = useContext(ContextKey.PRODUCT_SETTINGS_VIEW);
const updateProductSettingsMutation = useUpdateProductSettingsMutation();
const pdkConfig = usePdkConfig();

const createProductSettingsForm = (): FormInstance => {
  if (!context.product || !context.view || !context.values) {
    throw new Error('Product settings not loaded');
  }

  return defineForm('productSettings', {
    ...pdkConfig.formConfigProductSettings,
    fields: [
      ...generateFormFields(
        {
          // @ts-expect-error todo
          fields: context.view.elements,
          values: context.values,
        },
        'product',
      ),
    ],

    afterSubmit: async (form: FormInstance) => {
      await updateProductSettingsMutation.mutateAsync({
        form,
        productIds: [context.product.externalIdentifier],
      });
    },
  });
};

const form = createProductSettingsForm();
</script>
