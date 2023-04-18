<template>
  <!-- Order data page -->
  <div class="gap-8 grid grid-cols-2">
    <div class="col-span-2">
      <h1 class="font-bold text-2xl">Order #{{ order.externalIdentifier }}</h1>
    </div>

    <div class="border p-5 rounded-lg">
      <div class="flex flex-col md:flex-row">
        <div class="flex-1">
          <h2 class="font-bold text-xl">Shipping address</h2>
          <p v-text="order.recipient.fullStreet" />
          <p v-text="order.recipient.city" />
          <p v-text="order.recipient.cc" />
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
import {OrderBoxView} from '@myparcel-pdk/frontend-admin-core/src';
import {useDemoOrder} from '../composables/useDemoOrder';
import {useRoute} from 'vue-router';

const route = useRoute();
const {id} = route.params;

const order = useDemoOrder(id);
</script>
