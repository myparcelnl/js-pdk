<template>
  <div>
    <h1>{{ product.name }}</h1>
    <h2>SKU: {{ product.sku }}</h2>

    <PdkBox title="product settings">
      <ProductSettingsView />
    </PdkBox>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import {ProductSettingsView} from '@myparcel-pdk/frontend-admin-core';
import {useDemoProduct} from '../composables';

const route = useRoute();
const {id} = route.params;

const product = useDemoProduct(id);
</script>
