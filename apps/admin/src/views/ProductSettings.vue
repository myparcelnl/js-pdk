<template>
  <MagicForm :form="form" />
</template>

<script lang="ts" setup>
/**
 * Product settings.
 */
import {toRefs, toValue} from 'vue';
import {AdminContextKey} from '@myparcel-dev/pdk-common';
import {defineForm, type FormInstance, MagicForm} from '@myparcel-dev/vue-form-builder';
import {useQueryStore} from '../stores';
import {FORM_KEY_CHILD_PRODUCT_SETTINGS, FORM_KEY_PRODUCT_SETTINGS, generateFormFields} from '../forms';
import {useAdminConfig, useContext, useProductData} from '../composables';
import {useUpdateProductSettingsMutation} from '../actions';

const props = withDefaults(
  defineProps<{
    formName?: string;
    formKey?: typeof FORM_KEY_PRODUCT_SETTINGS | typeof FORM_KEY_CHILD_PRODUCT_SETTINGS;
  }>(),
  {
    formName: FORM_KEY_PRODUCT_SETTINGS,
    formKey: FORM_KEY_PRODUCT_SETTINGS,
  },
);

const propRefs = toRefs(props);

const queryStore = useQueryStore();
queryStore.registerContextQueries(AdminContextKey.ProductSettingsView);
queryStore.registerProductQueries();

const viewContext = useContext(AdminContextKey.ProductSettingsView);

const {product} = useProductData();

const updateProductSettingsMutation = useUpdateProductSettingsMutation();
const adminConfig = useAdminConfig();

const createProductSettingsForm = (): FormInstance => {
  const resolvedProduct = toValue(product);

  if (!resolvedProduct || !viewContext.view) {
    throw new Error('Product settings not loaded');
  }

  const overrides =
    FORM_KEY_CHILD_PRODUCT_SETTINGS === toValue(propRefs.formKey)
      ? {
          ...adminConfig.formConfigOverrides?.[FORM_KEY_PRODUCT_SETTINGS],
          ...adminConfig.formConfigOverrides?.[FORM_KEY_CHILD_PRODUCT_SETTINGS],
        }
      : adminConfig.formConfigOverrides?.[FORM_KEY_PRODUCT_SETTINGS];

  return defineForm(toValue(propRefs.formName), {
    ...overrides,
    fields: [
      ...generateFormFields({
        // @ts-expect-error todo
        fields: viewContext.view.elements,
        values: resolvedProduct.settings ?? {},
      }),
    ],

    afterSubmit: async (form: FormInstance) => {
      await updateProductSettingsMutation.mutateAsync({
        form,
        productIds: [resolvedProduct.externalIdentifier],
      });
    },
  });
};

const form = createProductSettingsForm();
</script>
