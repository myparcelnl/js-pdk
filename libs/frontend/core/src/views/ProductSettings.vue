<template>
  <MagicForm
    v-test="'ProductSettingsForm'"
    :form="form" />
</template>

<script lang="ts" setup>
/**
 * Product settings.
 */
import {FormInstance, MagicForm, defineForm} from '@myparcel/vue-form-builder/src';
import {useAdminConfig, useContext} from '../composables';
import {AdminContextKey} from '../types';
import {generateFormFields} from '../forms';
import {useQueryStore} from '../stores';
import {useUpdateProductSettingsMutation} from '../actions';

const queryStore = useQueryStore();
queryStore.registerContextQueries();

const context = useContext(AdminContextKey.ProductSettingsView);
const updateProductSettingsMutation = useUpdateProductSettingsMutation();
const adminConfig = useAdminConfig();

const createProductSettingsForm = (): FormInstance => {
  if (!context.product || !context.view || !context.values) {
    throw new Error('Product settings not loaded');
  }

  return defineForm('productSettings', {
    ...adminConfig.formConfigProductSettings,
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
