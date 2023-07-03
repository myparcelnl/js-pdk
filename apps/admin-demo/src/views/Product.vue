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
import {AdminContextKey, ProductSettingsView} from '@myparcel-pdk/frontend-admin-core';
import {BackendEndpoint, type Plugin} from '@myparcel-pdk/common';
import {patchQueryData} from '../utils';
import {useDemoProduct} from '../composables';

const route = useRoute();
const {id} = route.params;

const product = useDemoProduct(id);

patchQueryData<Plugin.ModelContextProductSettingsViewContext>(
  [BackendEndpoint.FetchContext, AdminContextKey.ProductSettingsView],
  (data) => ({
    ...data,
    values: product.settings,
  }),
);
</script>
