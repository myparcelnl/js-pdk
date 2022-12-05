<template>
  <PdkCard title="single_order_card_title">
    <template #default>
      <ConceptCard />
      <ShipmentsCard />
    </template>
  </PdkCard>
</template>

<script lang="ts">
import {useContextStore, useQueryStore} from '../../stores';
import ConceptCard from './ConceptCard.vue';
import ShipmentsCard from './ShipmentsCard.vue';
import {defineComponent} from 'vue';
import {useOrderQuery} from '../../composables';

/**
 * The "MyParcel" card in the single order view.
 *
 * @see /admin1/index.php/sell/orders/:orderIdentifier/view
 */
export default defineComponent({
  name: 'OrderCard',
  components: {
    ConceptCard,
    ShipmentsCard,
  },

  setup: () => {
    const order = useOrderQuery();
    const contextStore = useContextStore();
    const queryStore = useQueryStore();

    const orderId = order.data.value?.externalIdentifier;

    queryStore.registerOrderQueries(orderId);

    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-expect-error
    // queryStore.queryClient = useQueryClient();
    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-expect-error
    // queryStore.updateOrders = useUpdateOrdersQuery();
    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-expect-error
    // queryStore.exportOrders = useExportOrdersQuery();
    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-expect-error
    // queryStore.order = useOrderQuery();

    contextStore.context.orderIdentifier = orderId;
  },
});
</script>
