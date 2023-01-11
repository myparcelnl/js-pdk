<template>
  <!-- Order data page -->
  <div class="gap-8 grid grid-cols-3">
    <div class="col-span-3">
      <h1 class="font-bold text-2xl">Order #{{ order.externalIdentifier }}</h1>
    </div>

    <div class="border border-zinc-800 col-span-2 p-5 rounded-lg">
      <div class="flex flex-col md:flex-row">
        <div class="flex-1">
          <h2 class="font-bold text-xl">Shipping address</h2>
          <p>{{ order.recipient.fullStreet }}</p>
          <p>{{ order.recipient.city }}</p>
          <p>{{ order.recipient.cc }}</p>
        </div>
      </div>
    </div>

    <div class="border border-zinc-800 p-5 rounded-lg">
      <h2>Actions</h2>

      <div
        id="pdk-OrderCard"
        :data-pdk-context="context"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, nextTick} from 'vue';
import {useDemoOrder} from '../composables/useDemoOrder';
import {useGlobalPdkFrontend} from '@myparcel/pdk-frontend';
import {useRoute} from 'vue-router';

export default defineComponent({
  name: 'Order',

  setup: () => {
    const route = useRoute();
    const {id} = route.params;

    const order = useDemoOrder(id);

    const fe = useGlobalPdkFrontend();

    void nextTick().then(() => fe.render('OrderCard', '#pdk-OrderCard'));

    return {
      order,
      context: JSON.stringify({orderIdentifier: order.externalIdentifier, ...order}),
    };
  },
});
</script>
