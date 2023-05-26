<template>
  <MagicForm
    v-test="'ProductSettingsForm'"
    :form="form" />
</template>

<script lang="ts" setup>
/**
 * Product settings.
 */
import {type FormInstance, MagicForm, defineForm} from '@myparcel/vue-form-builder';
import {AdminContextKey} from '../types';
import {useQueryStore} from '../stores';
import {FORM_KEY_PRODUCT_SETTINGS, generateFormFields} from '../forms';
import {useAdminConfig, useContext} from '../composables';
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

  return defineForm(FORM_KEY_PRODUCT_SETTINGS, {
    ...adminConfig.formConfigOverrides?.[FORM_KEY_PRODUCT_SETTINGS],
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
