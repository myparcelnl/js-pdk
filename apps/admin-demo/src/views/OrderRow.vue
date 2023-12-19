<template>
  <tr>
    <td class="p-4">
      <RouterLink :to="`/orders/${order.externalIdentifier}`"> #{{ order.externalIdentifier }}</RouterLink>
    </td>

    <td class="p-4">{{ order.shippingAddress.address1 }}, {{ order.shippingAddress.city }}</td>

    <td class="p-4">
      <OrderListItemView :order-identifier="order.externalIdentifier" />
    </td>

    <td class="p-4">
      <button
        type="button"
        @click="() => toggle(order.externalIdentifier)">
        toggle
      </button>
    </td>
  </tr>
  <tr>
    <div
      v-for="item in ['mypa-OrderBox']"
      v-show="toggled"
      :key="item">
      <div :id="item">
        {{ `#${item}` }}
      </div>
    </div>
  </tr>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {AdminModalKey, OrderListItemView, type Plugin, useModalStore, useQueryStore} from '@myparcel-pdk/admin';

const props = defineProps<{order: Plugin.ModelPdkOrder}>();

const queryStore = useQueryStore();

queryStore.registerOrderQueries(props.order.externalIdentifier);

const toggled = ref<string | null>(null);

const toggle = (id: string) => {
  const modalStore = useModalStore();

  modalStore.open(AdminModalKey.ShipmentOptions, {orderIds: id});
};
</script>
