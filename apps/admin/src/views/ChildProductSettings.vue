<template>
  <ProductSettings
    :form-key="FORM_KEY_CHILD_PRODUCT_SETTINGS"
    :form-name="`${FORM_KEY_CHILD_PRODUCT_SETTINGS}--${productId}`" />
</template>

<script lang="ts" setup>
import {FORM_KEY_CHILD_PRODUCT_SETTINGS} from '../forms';
import {useInstanceContext} from '../composables';
import ProductSettings from './ProductSettings.vue';
import {AdminInstanceContextKey} from "../data";

const productId = useInstanceContext(AdminInstanceContextKey.ProductIdentifier);
</script>
