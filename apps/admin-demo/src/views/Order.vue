<template>
  <!-- Order data page -->
  <div
    v-if="order"
    class="gap-8 grid grid-cols-1 lg:grid-cols-2">
    <div class="lg:col-span-2">
      <h1 class="font-bold text-2xl">Order #{{ order.externalIdentifier }}</h1>
    </div>

    <div class="border p-5 rounded-lg">
      <div class="flex flex-col md:flex-row">
        <div class="flex-1">
          <h2 class="font-bold text-xl">Shipping address</h2>
          <p v-text="order.shippingAddress.address1" />
          <p v-text="order.shippingAddress.address2" />
          <p v-text="order.shippingAddress.postalCode" />
          <p v-text="order.shippingAddress.city" />
          <p v-text="order.shippingAddress.cc" />
        </div>
      </div>
    </div>

    <div class="border p-5 rounded-lg">
      <h2>Actions</h2>

      <OrderBoxView :order-identifier="order.externalIdentifier" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router';
import {OrderBoxView, useOrderData, useQueryStore} from '@myparcel-dev/pdk-admin';

const route = useRoute();
const {id} = route.params as {id: string};

useQueryStore().registerOrderQueries(id);

const {order} = useOrderData(id);
</script>
