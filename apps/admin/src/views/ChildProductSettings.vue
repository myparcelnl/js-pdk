<template>
  <ProductSettings
    :form-key="FORM_KEY_CHILD_PRODUCT_SETTINGS"
    :form-name="`${FORM_KEY_CHILD_PRODUCT_SETTINGS}--${productId}`" />
</template>

<script lang="ts" setup>
import {FORM_KEY_CHILD_PRODUCT_SETTINGS} from '../forms/formKeys';
import {useInstanceContext} from '../composables/context/useInstanceContext';
import ProductSettings from './ProductSettings.vue';
import {AdminInstanceContextKey} from '../data/constants';

const productId = useInstanceContext(AdminInstanceContextKey.ProductIdentifier);
</script>
