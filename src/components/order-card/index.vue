<template>
  <PsCard>
    <template #header>
      <h3 class="card-header-title" v-text="'MyParcel'" />
    </template>

    <template #default>
      <ConceptCard />
      <ShipmentsCard />
    </template>
  </PsCard>
</template>

<script lang="ts">
import ConceptCard from '@/components/order-card/ConceptCard.vue';
import PsCard from '@/plug-n-play/prestashop/PsCard.vue';
import ShipmentsCard from '@/components/order-card/ShipmentsCard.vue';
import {defineComponent} from 'vue';

/**
 * The "MyParcel" card in the single order view.
 *
 * @see /admin1/index.php/sell/orders/:orderId/view
 */
export default defineComponent({
  name: 'OrderCard',
  components: {
    ConceptCard,
    PsCard,
    ShipmentsCard,
  },
});
</script>
