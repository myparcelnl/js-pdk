<template>
  <table class="table-fixed text-left w-full">
    <tr class="bg-green-900">
      <th class="p-4">Order ID</th>
      <th class="p-4">Recipient</th>
      <th class="p-4">Labels</th>
      <th class="p-4">Actions</th>
    </tr>

    <template
      v-for="(order, index) in orderData"
      :key="`order_${order.externalIdentifier}`">
      <tr :class="{'bg-zinc-900': index % 2 !== 0}">
        <td class="p-4">
          <RouterLink :to="`/orders/${order.externalIdentifier}`"> #{{ order.externalIdentifier }} </RouterLink>
        </td>

        <td class="p-4">{{ order.recipient.fullStreet }}, {{ order.recipient.city }}</td>

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
  </table>
</template>

<script setup lang="ts">
import {AdminModalKey, OrderListItemView, useModalStore} from '@myparcel-pdk/frontend-admin-core/src';
import {RouterLink} from 'vue-router';
import {ref} from 'vue';
import {useDemoOrderData} from '../composables';

const toggled = ref<string | null>(null);

const toggle = (id: string) => {
  const modalStore = useModalStore();

  modalStore.open(AdminModalKey.ShipmentOptions, {orderIds: id});
};

const orderData = useDemoOrderData();
</script>
