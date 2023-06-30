<template>
  <table class="table-fixed text-left w-full">
    <tr class="bg-green-900">
      <th class="p-4">ID</th>
      <th class="p-4">Name</th>
      <th class="p-4">SKU</th>
    </tr>

    <template
      v-for="(product, index) in productData"
      :key="`product_${product.id}`">
      <tr :class="{'bg-gray-900': index % 2 !== 0}">
        <td class="p-4">
          <RouterLink :to="`/products/${product.externalIdentifier}`"> #{{ product.externalIdentifier }} </RouterLink>
        </td>

        <td class="p-4">{{ product.name }}</td>

        <td class="p-4">{{ product.sku }}</td>
      </tr>
    </template>
  </table>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router';
import {useDemoProductData} from '../composables';

const productData = useDemoProductData();
</script>
