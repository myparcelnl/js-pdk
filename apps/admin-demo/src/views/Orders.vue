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
          <div
            :id="`mypa-order-${order.externalIdentifier}`"
            :data-pdk-context="
              JSON.stringify({
                orderIdentifier: order.externalIdentifier,
                orderData: order,
              })
            " />
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

<script lang="ts">
import {AdminModalKey, useGlobalPdkAdmin, useModalStore} from '@myparcel-pdk/frontend-core/src';
import {defineComponent, ref} from 'vue';
import {AdminView} from '@myparcel-pdk/common/src';
import {RouterLink} from 'vue-router';
import {useDemoOrderData} from '../composables';

export default defineComponent({
  name: 'Orders',

  components: {
    RouterLink,
  },

  setup: () => {
    const fe = useGlobalPdkAdmin();

    const orderData = useDemoOrderData();

    void fe.render(AdminView.MODALS, '#mypa-modals');

    orderData.forEach((order) => {
      void fe.render(AdminView.ORDER_LIST_ITEM, `#mypa-order-${order.externalIdentifier}`);
    });

    const toggled = ref<string | null>(null);

    return {
      orderData,
      toggled,

      toggle: (id: string) => {
        const modalStore = useModalStore();

        modalStore.open(AdminModalKey.SHIPMENT_OPTIONS, id);
      },
    };
  },
});
</script>
