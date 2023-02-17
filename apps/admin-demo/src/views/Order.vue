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
          <p v-text="order.recipient.fullStreet" />
          <p v-text="order.recipient.city" />
          <p v-text="order.recipient.cc" />
        </div>
      </div>
    </div>

    <div class="border border-zinc-800 p-5 rounded-lg">
      <h2>Actions</h2>

      <div
        id="pdk-OrderBox"
        :data-pdk-context="JSON.stringify({orderIdentifier: order.externalIdentifier, orderData: order})" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, nextTick} from 'vue';
import {AdminView} from '@myparcel-pdk/common/src';
import {useDemoOrder} from '../composables/useDemoOrder';
import {useGlobalPdkAdmin} from '@myparcel-pdk/frontend-core/src';
import {useRoute} from 'vue-router';

export default defineComponent({
  name: 'Order',

  setup: () => {
    const route = useRoute();
    const {id} = route.params;

    const order = useDemoOrder(id);

    const fe = useGlobalPdkAdmin();

    void nextTick().then(() => fe.render(AdminView.ORDER_BOX, '#pdk-OrderBox'));

    return {order};
  },
});
</script>
